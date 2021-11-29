import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from '../../@core/mock/toastr-service';
import {checkUser, notSpaceLogin} from '../../validator';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../@core/services/login.service';
import {TranslateService} from '@ngx-translate/core';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})


export class LoginComponent implements OnInit {
  ngOnInit() {
    this.initForm();
  }

  constructor(private loginService: LoginService,
              private router: Router,
              private route: ActivatedRoute,
              private translateService: TranslateService,
              private translate: TranslateService,
              private toastr: ToastrService) {

  }


  captchaError: boolean = false;
  inputUser: FormGroup;
  data: any;
  isLoad: boolean;
  submitted = false;
  showPassword = false;
  languages = [
    {
      value: 'en',
      name: 'English',
    },
    {
      value: 'vi',
      name: 'Vietnamese',
    },
  ];
  currentLanguage = this.getLanguage();
  getLanguage() {
    let language = localStorage.getItem('languageName');
    if (language === undefined || language === null) {
      language = 'vi';
    }

    return language;

  }
  initForm() {
    this.inputUser = new FormGroup({
      name: new FormControl(this.getCookie('name'), [checkUser, Validators.maxLength(50), Validators.required]),
      pass: new FormControl(this.getCookie('pass'), [notSpaceLogin, Validators.minLength(6), Validators.maxLength(60), Validators.required]),
      remember: new FormControl(this.getCookie('remember'), []),
      recaptchaReactive: new FormControl(null, [])
    });
  }

  hideLogin = () => {
    document.querySelector('.modal').classList.add('is-open');
    document.querySelector('body').style.overflow = 'hidden';
  };

  trimValue(event) {
    event.target.value = event.target.value.trim();
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  changeLanguage(languageName: string) {
    localStorage.setItem('languageName', languageName);
    this.translate.use(languageName);

  }

  onSubmit() {
    this.isLoad = true;
    this.submitted = true;
    this.captchaError = true;
    if (this.inputUser.valid) {
      if (this.inputUser.value.remember) {
        document.cookie = 'name=' + this.inputUser.value.name;
        document.cookie = 'pass=' + this.inputUser.value.pass;
        document.cookie = 'remember=' + true;
      } else {
        document.cookie = 'name=' + '';
        document.cookie = 'pass=' + '';
        document.cookie = 'remember=' + false;
      }
      this.loginService.login(this.inputUser.value).subscribe(res => {
        this.submitted = false;
        if (res.status === 200) {
          console.log(res.body);
          if (res.body.customUserDetails.rolesId === 1) {
            window.location.href = '/toeic-web/admin/home';
            localStorage.setItem('objects', JSON.stringify(res.body.listObjects));
            console.log('admin');
          } else if ( res.body.customUserDetails.rolesId === 2) {
            localStorage.setItem('objectsC', JSON.stringify(res.body.listObjects));
            window.location.href = '/toeic-web/trang-chu';
            console.log('client');
          }
          localStorage.setItem('httpHeaders', res.body.httpHeaders.Authorization);
          localStorage.setItem('users', res.body.customUserDetails.fullName);
          localStorage.setItem('userDetails', JSON.stringify(res.body.customUserDetails));
          this.isLoad = false;
          this.captchaError = false;
        }
      }, err => {
        const title = this.translateService.instant('login.error');
        let body1: any;
        try {
          body1 = err.error.message;
        } catch {
          body1 = '';
        } finally {
          this.isLoad = false;
          this.captchaError = false;
          this.toastr.showToast('danger', title, body1);
          // grecaptcha.reset();
        }
      });
    } else {
      this.isLoad = false;
    }
  }

  getCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
}
