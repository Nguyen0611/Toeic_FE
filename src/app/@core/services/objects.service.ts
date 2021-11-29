import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ObjectsService {
  constructor(private http: HttpClient) {
  }

  query(): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/objects`, {
      observe: 'response'
    });
  }
  queryTopic(id: any): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/objects-topic/${id}`, {
      observe: 'response'
    });
  }

  getAllObjRoleAction(id: any): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/objects/${id}`, {
      observe: 'response'
    });
  }

  public updateObjRoleAction(data): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/role-objects`, data, {
      observe: 'response'
    });
  }

  public update(data): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/objects`, data, {
      observe: 'response'
    });
  }

  public insert(data): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/objects`, data, {
      observe: 'response'
    });
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/objects/${id}`);
  }

  getParent(): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/object/getParent`, {
      observe: 'response'
    });
  }


  public getTreeParent(): Observable<any> {
    return this.http.post<any[]>(`${environment.apiUrl}/object/getTreeParent`, {}, {
      observe: 'response'
    });
  }

}
