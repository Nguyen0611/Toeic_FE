import {Component, OnInit} from '@angular/core';
import {NbMenuItem, NbMenuService} from '@nebular/theme';
import {LoginService} from '../@core/services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private menuService: NbMenuService) {

  }

  formatListPractices(data, paren) {
    const arr = [];
    for (let i = 0; i < data.length; i++) {
      const dataItem = data[i];
      if (dataItem.parenId === paren) {
        const children = this.formatListPractices(data, dataItem.id);
        if (children.length > 0) {
          dataItem.link = null;
          dataItem.children = children;
        }
        arr.push(dataItem);
      }
    }
    return arr;
  }

  menu: Array<any>;
  home: Object;
  obj: any;
  items: NbMenuItem[] = [];

  ngOnInit(): void {
    this.menuService.onItemClick().subscribe((event) => {
      role = [];
      role.push(event.item);
    });

    this.menu = [];
    this.home = {
      title: 'Home',
      icon: 'home-outline',
      link: '/admin/home',
    };
    this.menu.push(this.home);
    let menu1;
    try {
      const token = localStorage.getItem('httpHeaders');
      if (token.trim().length === 0 && token === null) {
        localStorage.setItem('objects', null);
      } else {
        // login thanh cong r, nhung van gui them 1 api xac thuc nua -- fix
        console.log("test");
        this.loginService.authenticationcate({}).subscribe(res => {
          if (res.status === 200) {
            this.obj = res.body.listObjects;
            localStorage.setItem('objects', JSON.stringify(this.obj));
            menu1 = this.formatListPractices(this.obj, 0);
            for (let i = 0; i < menu1.length; i++) {
              this.menu.push(menu1[i]);
            }
            this.items = this.menu;
          }
        }, err => {
          localStorage.clear();
          this.router.navigate(['auths/login']);

        });
      }
    } catch (e) {
      localStorage.setItem('objects', null);
    }
  }
}


export let role = [];

export function checkRoleAction(roleAction: string) {
  for (let i = 0; i < role[0].role?.length; i++) {
    if (role[0].role[i].codeAction === roleAction) {
      return true;
    }
  }
  return false;
}
