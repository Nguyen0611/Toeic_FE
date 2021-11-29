import {NgModule} from '@angular/core';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule, NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbRadioModule,
  NbSpinnerModule,
} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {ClientRoutingModule} from './client-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClientComponent} from './client.component';
import {RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings} from 'ng-recaptcha';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../shares/shared.module';
import {HomeClientComponent} from './home_client/home-client.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import {ContactComponent} from './contact/contact.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SearchFilterComponent} from './news/search-filter/search-filter.component';
import {JwPaginationModule} from 'jw-angular-pagination';
import {NgSelectModule} from '@ng-select/ng-select';
import {BlogComponent} from './news/blog/blog.component';
import {BlogDetailComponent} from './news/blog-detail/blog-detail.component';
import {ListCategoryComponent} from './news/listCategory/listCategory.component';
import {RecentPostComponent} from './news/recent-post/recent-post.component';
import {NewsLetterComponent} from './news/news-letter/news-letter.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {AgmCoreModule} from '@agm/core';
import {InforUsersComponent} from "./infor_users/infor-users.component";
import {LsListeningComponent} from "./listening/lsListening/lsListening.component";
import {DetailsComponent} from "./listening/details/details.component";
import {NgxAudioPlayerModule} from "ngx-audio-player";
import { ReadingComponent } from './reading/lsReading/reading.component';
import { ReadingDetailsComponent } from './reading/reading_details/reading-details.component';
import {ReadingDetailsPart6Component} from "./reading/reading_details_part6/reading-details-part6.component";
import {MatRadioModule} from "@angular/material/radio";


@NgModule({
    imports: [
        JwPaginationModule,
        ClientRoutingModule,
        ThemeModule,
        NbMenuModule,
        NbCardModule,
        NbDatepickerModule,
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
        NbButtonModule,
        SharedModule,
        SlideshowModule,
        NgbModule,
        NgSelectModule,
        PdfViewerModule,
        NbRadioModule,
        AgmCoreModule,
        NgxAudioPlayerModule,
        MatRadioModule
    ],
  declarations: [
    SearchFilterComponent,
    ClientComponent,
    BlogComponent,
    BlogDetailComponent,
    HomeClientComponent,
    ContactComponent,
    ListCategoryComponent,
    DetailsComponent,
    RecentPostComponent,
    NewsLetterComponent,
    LsListeningComponent,
    InforUsersComponent,
    ReadingComponent,
    ReadingDetailsComponent,
    ReadingDetailsPart6Component,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6Ldch8gZAAAAAOAujSVYWFyoWkTaNgBNzE6qyxwg',
      } as RecaptchaSettings,
    }]
})
export class ClientModule {
}
