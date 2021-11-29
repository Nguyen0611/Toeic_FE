import {Component, OnInit, ViewChild} from '@angular/core';
import {NbSidebarComponent, NbSidebarService} from '@nebular/theme';
import {LayoutService} from '../../../@core/utils';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar  #sidebar class="menu-sidebar" id="sidebar" tag="menu-sidebar" responsive state="compacted">
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
<!--        <app-breadcrumb></app-breadcrumb>-->
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent implements OnInit {
  @ViewChild('sidebar') elRef: NbSidebarComponent;

  constructor(private sidebarService: NbSidebarService, private layoutService: LayoutService) {
  }

  ngOnInit(): void {
    this.sidebarService.onToggle().subscribe(value => {
      if (this.elRef.compacted) {
        this.layoutService.changeOnCollapse(false);
      } else {
        this.layoutService.changeOnCollapse(true);
      }
    });
  }
}
