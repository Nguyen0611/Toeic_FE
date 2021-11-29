import {NgModule} from '@angular/core';
import {
  NbAlertModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbSpinnerModule,
} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {AuthsRoutingModule} from './auths-routing.module';
import {LoginComponent} from './logins/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthsComponent} from './auths.component';
import {ConfirmEmailComponent} from './confirmEmail/confirmEmail.component';
import {ChangePassEmailComponent} from './changePassEmail/changePassEmail.component';
import {RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings} from 'ng-recaptcha';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../shares/shared.module';
import { ChangePassComponent } from './changePass/changePass.component';
import {NgSelectModule} from '@ng-select/ng-select';
import { RegistrationComponent } from './registration/registration.component';


@NgModule({
    imports: [
        AuthsRoutingModule,
        ThemeModule,
        NbMenuModule,
        NbCardModule,
        NbAlertModule,
        FormsModule,
        NbInputModule,
        NbCheckboxModule,
        NbIconModule,
        ReactiveFormsModule,
        NbLayoutModule,
        NbSpinnerModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        ReactiveFormsModule,
        TranslateModule,
        SharedModule,
        NgSelectModule,
    ],
  declarations: [
    ChangePassComponent,
    LoginComponent,
    AuthsComponent,
    RegistrationComponent,
    ConfirmEmailComponent,
    ChangePassEmailComponent,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6Ldch8gZAAAAAOAujSVYWFyoWkTaNgBNzE6qyxwg',
      } as RecaptchaSettings,
    }]
})
export class AuthsModule {
}
