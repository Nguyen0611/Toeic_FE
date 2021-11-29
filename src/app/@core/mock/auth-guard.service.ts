import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {role} from '../../admin/pages.component';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('httpHeaders');
    if (token === undefined || token === null || token === '') {
      localStorage.clear();
      this.router.navigate(['/auths/login']);
      return false;
    }
    const users = JSON.parse(localStorage.getItem('userDetails'));
    if (users.rolesId === 2) {
      this.router.navigate(['/trang-chu']);
      return false;
    }
    let checkRole = false;
    const obj = JSON.parse(localStorage.getItem('objects'));
    try {
      if (state.url === '/admin/home' || state.url === '/admin/404' || state.url === '/admin/info-users') {
        return true;
      } else {
        for (let i = 0; i < obj?.length; i++) {
          const path = state.url.substring(0, obj[i].link?.length);
          if (obj[i].link !== '' && obj[i].link === path) {
            role.slice(0, role.length);
            role.push(obj[i]);
            checkRole = true;
          }
        }
      }

      if (!checkRole) {
        this.router.navigate(['/admin/home']);
        return false;
      }
    } catch (e) {
      localStorage.clear();
      this.router.navigate(['/auths/login']);
      return false;
    }
    return true;
  }
}
