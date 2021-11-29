import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ngx-auths',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ngx-two-columns-layout>
      <router-outlet></router-outlet>
      </ngx-two-columns-layout>
  `,
})
export class AuthsComponent  {
}

