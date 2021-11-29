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
  NbSpinnerModule,
  NbToggleModule,
  NbUserModule,
} from '@nebular/theme';

import {ThemeModule} from '../../@theme/theme.module';

import {TopicRoutingModule} from './topic-routing.module';
import {TopicUpdateComponent} from './topic-update/topic-update.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule as ngFormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedModule} from '../../shares/shared.module';
import {TopicComponent} from './topic.component';
import {NgxMaskModule} from 'ngx-mask';
import {HeroPickerModule} from '../../shares/directives/hero-picker/hero-picker.module';


@NgModule({
  imports: [
    ThemeModule,
    TopicRoutingModule,
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
    ngFormsModule,
    Ng2SmartTableModule,
    NbFormFieldModule,
    TranslateModule,
    NgSelectModule, SharedModule,
    ReactiveFormsModule,
    NgxMaskModule,
    NgxDatatableModule,
    NbSpinnerModule, NbToggleModule, HeroPickerModule,
  ],
  entryComponents: [
    TopicUpdateComponent
  ],
  declarations: [TopicComponent, TopicUpdateComponent],
})
export class TopicModule {
}
