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

import {UsersRoutingModule} from './users-routing.module';
import {UserUpdateComponent} from './user-update/user-update.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule as ngFormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedModule} from '../../shares/shared.module';
import {UsersComponent} from './users.component';
import {NgxMaskModule} from 'ngx-mask';
import {HeroPickerModule} from '../../shares/directives/hero-picker/hero-picker.module';
import {UserUpdateClientComponent} from "./user-update-client/user-update-client.component";


@NgModule({
  imports: [
    ThemeModule,
    UsersRoutingModule,
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
    UserUpdateComponent
  ],
  declarations: [UsersComponent, UserUpdateComponent, UserUpdateClientComponent],
})
export class UsersModule {
}
