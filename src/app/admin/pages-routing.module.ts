import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {HomeComponent} from './homes/home.component';
import {InforUsersComponent} from "./infor_users/infor-users.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent,
    }, {
      path: 'info-users',
      component: InforUsersComponent,
    }, {
      path: 'topic',
      loadChildren: () => import('./sys-topic/topic.module')
        .then(m => m.TopicModule),
    },
    {
      path: 'category',
      loadChildren: () => import('./sys-category/category.module')
        .then(m => m.CategoryModule),
    },
    {
      path: 'users',
      loadChildren: () => import('./sys-users/users.module')
        .then(m => m.UsersModule),
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: '**',
      redirectTo: 'home',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
