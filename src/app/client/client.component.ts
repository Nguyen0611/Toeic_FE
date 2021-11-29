import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ngx-client',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ngx-client-column-layout>
      <router-outlet></router-outlet>
      </ngx-client-column-layout>
  `,
})
export class ClientComponent  {
}

