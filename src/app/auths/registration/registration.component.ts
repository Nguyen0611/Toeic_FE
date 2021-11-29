import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from '../../@core/mock/toastr-service';
import {checkUser, notSpaceLogin, validEmail} from '../../validator';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../@core/services/login.service';
import {TranslateService} from '@ngx-translate/core';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-login',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})


export class RegistrationComponent implements OnInit {
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
      // name: new FormControl(null, [checkUser, Validators.maxLength(50), Validators.required]),
      mail: new FormControl('', [validEmail, Validators.required]),
      // pass: new FormControl(null, [notSpaceLogin, Validators.minLength(6), Validators.maxLength(60), Validators.required]),
      // oldPass: new FormControl(null, [notSpaceLogin, Validators.minLength(6), Validators.maxLength(60), Validators.required]),
    });
  }

  hideLogin = () => {
    document.querySelector('.modal').classList.add('is-open');
    document.querySelector('body').style.overflow = 'hidden';
  };

  trimValue(event) {
    event.target.value = event.target.value.trim();
  }

  getInputType(a: number) {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword(a: number) {
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
      this.loginService.registration(this.inputUser.value).subscribe(res => {
        this.submitted = false;
        if (res.status === 200) {
          this.isLoad = false;
          this.toastr.showToast('success', "Thông báo", "Vui lòng kiểm tra email");
          this.router.navigate(['auths/login']);
          console.log(res.body);
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
        }
      });
    } else {
      this.isLoad = false;
    }
  }
}
