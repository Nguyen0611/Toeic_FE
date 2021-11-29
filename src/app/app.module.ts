/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LOCALE_ID, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {DecimalPipe, registerLocaleData} from '@angular/common';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import vi from '@angular/common/locales/vi';
import viEt from '@angular/common/locales/extra/vi';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {AuthInterceptor} from './interceptor/auth.interceptor';
import {NbDateFnsDateModule} from '@nebular/date-fns';
import { NgxMaskModule } from 'ngx-mask';
import {FacebookModule} from 'ngx-facebook';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {AgmCoreModule} from '@agm/core';
import {NbMomentDateModule} from "@nebular/moment";

registerLocaleData(vi, 'vi-VI', viEt);


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    PdfViewerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbDateFnsDateModule,
    NbMomentDateModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NgbModule,
    FacebookModule.forRoot(),
    NbDateFnsDateModule.forRoot({
      parseOptions: { useAdditionalWeekYearTokens: true, useAdditionalDayOfYearTokens: true },
      formatOptions: { useAdditionalWeekYearTokens: true, useAdditionalDayOfYearTokens: true },
    }),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyCgrPfTlz3u7JD4n6x3jk6JeYEmsVY7nl4'
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
      defaultLanguage: getLanguage(),
    }),
  ],
  bootstrap: [AppComponent],
  providers: [{provide: LOCALE_ID, useValue: 'vi-VI'}, DecimalPipe, SessionStorageService, LocalStorageService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }]
})


export class AppModule {
}

export function getLanguage() {
  let language = localStorage.getItem('languageName');
  if (language === undefined || language === null) {
    language = 'en';
  }
  return language;
}
