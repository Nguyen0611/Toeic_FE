import {NgModule} from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule, NbTabsetModule,
  NbToggleModule,
  NbUserModule,
} from '@nebular/theme';

import {ThemeModule} from '../../@theme/theme.module';

import {CategoryRoutingModule} from './category-routing.module';
import {CategoryUpdateComponent} from './category-update/category-update.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule as ngFormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedModule} from '../../shares/shared.module';
import {CategoryComponent} from './category.component';
import {NgxMaskModule} from 'ngx-mask';
import {HeroPickerModule} from '../../shares/directives/hero-picker/hero-picker.module';
import {SanitizerUrlPipe} from "./category-update/sanitize-url.pipe";
import {NgxAudioPlayerModule} from "ngx-audio-player";


@NgModule({
  imports: [
    ThemeModule,
    CategoryRoutingModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    NbTabsetModule,
    ngFormsModule,
    Ng2SmartTableModule,
    NbFormFieldModule,
    TranslateModule,
    NgSelectModule, SharedModule,
    ReactiveFormsModule,
    NgxMaskModule,
    NgxAudioPlayerModule,
    NgxDatatableModule,
    NbSpinnerModule, NbToggleModule, HeroPickerModule,
  ],
  entryComponents: [
    CategoryUpdateComponent
  ],
  declarations: [CategoryComponent, CategoryUpdateComponent, SanitizerUrlPipe],
})
export class CategoryModule {
}
