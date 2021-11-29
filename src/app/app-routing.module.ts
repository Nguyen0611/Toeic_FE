import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuardService} from './@core/mock/auth-guard.service';
import {AuthGuardAuthsService} from './@core/mock/auth-guard-auths.service';


export const routes: Routes = [
  {
    canActivate: [AuthGuardService],
    path: 'admin',
    loadChildren: () => import('./admin/pages.module')
      .then(m => m.PagesModule),
    data: {
      breadcrumb: 'Trang chủ'
    },
  },
  {
    canActivate: [AuthGuardAuthsService],
    path: 'auths',
    loadChildren: () => import('./auths/auths.module')
      .then(m => m.AuthsModule),
  },
  {
    path: '',
    loadChildren: () => import('./client/client.module')
      .then(m => m.ClientModule),
  },
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: '**', redirectTo: ''},
];

const config: ExtraOptions = {
  useHash: false,
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64]
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
