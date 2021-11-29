import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from '../../@core/mock/toastr-service';
import {checkUser, notSpaceLogin, validPassword} from '../../validator';
import {Router} from '@angular/router';
import {TranslateService} from "@ngx-translate/core";
import {LoginService} from '../../@core/services/login.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-login',
  templateUrl: './changePass.component.html',
  styleUrls: ['./changePass.component.scss'],
})


export class ChangePassComponent implements OnInit {

  inputUser: FormGroup;
  data: any;
  checkKey: any;
  body: any;
  submitted = false;
  isLoad: boolean;


  constructor(private http: LoginService,
              private toastr: ToastrService,
              private translateService: TranslateService,
              private router: Router) {
    this.checkKey = localStorage.getItem('httpHeaders');
    if (this.checkKey === null) {
      // tai khoan chua login - cho quay ve trang login
      this.router.navigate(['auths/login']);
    }
  }

  showPassword = false;
  showPassword1 = false;
  showPassword2 = false;

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
    if (a === 3) {
      if (this.showPassword2) {
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
    if (a === 3) {
      this.showPassword2 = !this.showPassword2;
    }
  }

  trimValue(event) {
    event.target.value = event.target.value.trim();
  }

  initForm() {
    this.inputUser = new FormGroup({
        userName: new FormControl(this.checkKey, []),
        oldPass: new FormControl('', [notSpaceLogin, Validators.minLength(6), Validators.maxLength(60), Validators.required]),
        newPass: new FormControl('', [notSpaceLogin, Validators.minLength(6), Validators.maxLength(60), Validators.required]),
        comPass: new FormControl('', [notSpaceLogin, Validators.minLength(6), Validators.maxLength(60), Validators.required]),
      },
      {
        validators: validPassword,
      });
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
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
          this.router.navigate(['admin/home']);
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
      });
    } else {
      this.isLoad = false;
    }
  }

}
