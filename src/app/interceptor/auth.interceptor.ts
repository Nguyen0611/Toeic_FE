import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request || !request.url ||
      (request.url.startsWith('http') && !(environment.apiUrl && request.url.startsWith(environment.apiUrl)))) {
      return next.handle(request);
    }
    const token = localStorage.getItem('httpHeaders');
    let language = localStorage.getItem('languageName');
    if (language === undefined || language === null) {
      language = 'vi';
    }
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token,
          'Accept-Language': language,
        },
      });
    } else {
      request = request.clone({
        setHeaders: {
          'Accept-Language': language,
        },
      });
    }
    return next.handle(request).do((event: any) => {
      if (event instanceof HttpResponse) {
        if (event.url.indexOf('/api/client/') === -1) {
          if (event.url !== window.location.origin + '/toeic-web/assets/i18n/' + language + '.json') {
            localStorage.setItem('httpHeaders', event.headers.get('Authorization'));
          }
        }
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 || err.status === 0) {
          localStorage.clear();
          this.router.navigate(['auths/login']);
        }
      }
    });
  }
}
