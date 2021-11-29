import {Component, OnInit} from '@angular/core';
declare var main: any;
@Component({
  selector: 'ngx-client-column-layout',
  styleUrls: ['./client-column.layout.scss'],
  template: `
    <nb-layout>
      <nb-layout-header style="padding: 0 !important; height: 40px !important;">
        <ngx-header-client style="width: 100% !important;"></ngx-header-client>
      </nb-layout-header>
      <nb-layout-column style="padding: 0 !important;">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer-client></ngx-footer-client>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class ClientColumnLayoutComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
