import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ToastrService} from '../../@core/mock/toastr-service';
import {validEmail} from '../../validator';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LoginService} from '../../@core/services/login.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-confirm-email',
  templateUrl: './confirmEmail.component.html',
  styleUrls: ['./confirmEmail.component.scss'],
})


export class ConfirmEmailComponent implements OnInit {


  constructor(private http: LoginService,
              private toastr: ToastrService,
              private translateService: TranslateService,
              private router: Router) {

  }

  inputUser: FormGroup;
  data: any;
  isLoad: boolean;
  body: any;
  submitted = false;

  initForm() {
    this.inputUser = new FormGroup({
      email: new FormControl('', [validEmail, Validators.required]),
    });
  }

  ngOnInit() {
    this.initForm();
  }

  trimValue(event) {
    event.target.value = event.target.value.trim();
  }

  onSubmit() {
    this.isLoad = true;
    this.submitted = true;
    if (this.inputUser.valid) {
      this.http.sendSimpleEmail(this.inputUser.value).subscribe(res => {
        console.log(res);
        if (res.status === 200) {
          this.submitted = false;
          this.isLoad = false;
          try {
            this.body = res.body.data;
          } catch {
            this.body = '';
          }
          this.toastr.showToast('success', this.translateService.instant('login.notification'), this.body);
          this.router.navigate(['auths/login']);

        }
      }, err => {
        console.log(err);
        const title = this.translateService.instant('login.error');
        let body: any;
        try {
          body = err.error.message;
        } catch {
          body = '';
        } finally {
          this.isLoad = false;
          this.toastr.showToast('danger', title, body);
        }
      });
    } else {
      this.isLoad = false;
    }
  }
}
