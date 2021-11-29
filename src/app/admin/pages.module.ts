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
  NbMenuModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbToggleModule,
  NbUserModule
} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent, role} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {InforUsersComponent} from "./infor_users/infor-users.component";
import {FormsModule as ngFormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shares/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {NgSelectModule} from "@ng-select/ng-select";
import {NgxMaskModule} from "ngx-mask";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NbDateFnsDateModule} from "@nebular/date-fns";
import {NbMomentDateModule} from "@nebular/moment";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    ThemeModule,
    NbDatepickerModule,
    NbDateFnsDateModule,
    NbMomentDateModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
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
    NbSpinnerModule, NbToggleModule,
  ],
  declarations: [
    PagesComponent, role, InforUsersComponent
  ],
})
export class PagesModule {
}
