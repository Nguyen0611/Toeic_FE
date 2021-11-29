import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSelectModule,
  NbSidebarModule,
  NbThemeModule,
  NbUserModule,
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {NbSecurityModule} from '@nebular/security';
import {
  DefaultTreeviewEventParser,
  DefaultTreeviewI18n,
  TreeviewConfig,
  TreeviewEventParser,
  TreeviewI18n
} from 'ngx-treeview';
import {
  ClientFooterComponent,
  ClientHeaderComponent,
  FooterComponent,
  HeaderComponent,
  SearchInputComponent,
  TinyMCEComponent
} from './components';

import {CapitalizePipe, NumberWithCommasPipe, PluralPipe, RoundPipe, TimingPipe} from './pipes';
import {OneColumnLayoutComponent, ThreeColumnsLayoutComponent, TwoColumnsLayoutComponent} from './layouts';
import {DEFAULT_THEME} from './styles/theme.default';
import {COSMIC_THEME} from './styles/theme.cosmic';
import {CORPORATE_THEME} from './styles/theme.corporate';
import {DARK_THEME} from './styles/theme.dark';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrService} from '../@core/mock/toastr-service';
import {AuthGuardService} from '../@core/mock/auth-guard.service';
import {AuthGuardAuthsService} from '../@core/mock/auth-guard-auths.service';
import {NgSelectModule} from '@ng-select/ng-select';
import {ClientColumnLayoutComponent} from './layouts/client-column/client-column.layout';
import {TranslateModule} from '@ngx-translate/core';
import { BreadcrumbComponent } from './layouts/bread-crumb/bread-crumb.component';

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
];
const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SearchInputComponent,
  TinyMCEComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
  ClientColumnLayoutComponent,
  ClientFooterComponent,
  ClientHeaderComponent,
  BreadcrumbComponent
];
const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
];
const SERVICE = [
  ToastrService,
  AuthGuardService,
  AuthGuardAuthsService,
  [TreeviewConfig,
    {provide: TreeviewI18n, useClass: DefaultTreeviewI18n},
    {provide: TreeviewEventParser, useClass: DefaultTreeviewEventParser},
  ],
];


@NgModule({
    imports: [CommonModule, ...NB_MODULES, FormsModule, NbCardModule, NbCheckboxModule, NgSelectModule, ReactiveFormsModule, TranslateModule],
  exports: [CommonModule, ...PIPES, ...COMPONENTS],
  declarations: [...COMPONENTS, ...PIPES],
  providers: [...SERVICE],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'default',
          },
          [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME],
        ).providers,
      ],
    };
  }
}
