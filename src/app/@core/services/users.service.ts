import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../shares/utils/request-util';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { // Khởi tạo
  }

  public doSearch(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/users`, {
      params: options,
      observe: 'response'
    });
  }

  query(id: any): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/users/${id}`, {
      observe: 'response'
    });
  }

  public update(data: any, file?: File): Observable<any> {
    const model: any = data;
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('model', JSON.stringify(model));
    return this.http.put<any>(`${environment.apiUrl}/users`, formData, {
      observe: 'response'
    });
  }

  public insert(data: any,  file?: File): Observable<any> {
    const model: any = data;
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('model', JSON.stringify(model));
    return this.http.post<any>(`${environment.apiUrl}/users`, formData, {
      observe: 'response'
    });
  }

  public insertClient(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/client/users`, data, {
      observe: 'response'
    });
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/users/${id}`);
  }
}
