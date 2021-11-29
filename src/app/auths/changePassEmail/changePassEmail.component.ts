import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from '../../@core/mock/toastr-service';
import {notSpaceLogin, validPassword} from '../../validator';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LoginService} from '../../@core/services/login.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-login',
  templateUrl: './changePassEmail.component.html',
  styleUrls: ['./changePassEmail.component.scss'],
})


export class ChangePassEmailComponent implements OnInit {

  inputUser: FormGroup;
  data: any;
  body: any;
  token1: string;
  submitted = false;
  isLoad: boolean;

  showPassword = false;
  showPassword1 = false;

  getInputType(a: number) {
    if (a === 1) {
      if (this.showPassword) {
        return 'text';
      }
    }
    if (a === 2) {
      if (this.showPassword1) {
        return 'text';
      }
    }
    return 'password';
  }

  toggleShowPassword(a: number) {
    if (a === 1) {
      this.showPassword = !this.showPassword;
    }
    if (a === 2) {
      this.showPassword1 = !this.showPassword1;
    }
  }

  trimValue(event) {
    event.target.value = event.target.value.trim();
  }

  constructor(private http: LoginService,
              private toastr: ToastrService,
              private translateService: TranslateService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private route: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.token1 = params['key'];
    });
  }

  initForm() {
    this.inputUser = new FormGroup({
      newPass: new FormControl('', [notSpaceLogin, Validators.minLength(6), Validators.maxLength(60), Validators.required]),
      comPass: new FormControl('', [notSpaceLogin, Validators.minLength(6), Validators.maxLength(60), Validators.required]),
      key: new FormControl(),
    }, {
      validators: validPassword,
    });
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.inputUser.value.key = this.token1;
    this.isLoad = true;
    this.submitted = true;
    if (this.inputUser.valid) {
      this.http.changePass(this.inputUser.value).subscribe(res => {
        if (res.status === 200) {
          this.submitted = false;
          try {
            this.body = res.body.data;
          } catch {
            this.body = '';
          } finally {
            this.isLoad = false;
          }
          this.toastr.showToast('success', this.translateService.instant('login.notification'), this.body);
          this.router.navigate(['auths/login']);
        }
      }, err => {
        const title = this.translateService.instant('login.error');
        try {
          this.body = err.error.message;
        } catch {
          this.body = '';
        } finally {
          this.isLoad = false;
        }
        this.toastr.showToast('danger', title, this.body);
        if (err.status === 401) {
          this.router.navigate(['auths/login']);
        }
      });
    } else {
      this.isLoad = false;
    }
  }

}
