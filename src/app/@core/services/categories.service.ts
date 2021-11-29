import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../shares/utils/request-util';

@Injectable({ // Nhúng 1 serviec vào 1 service khác
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) {
  }


  query(): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/categories`, {
      observe: 'response'
    });
  }

  public doSearchDetail(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/detailCategories`, {
      params: options,
      observe: 'response'
    });
  }

  public doSearch(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/categories`, {
      params: options,
      observe: 'response'
    });
  }

  public update(data: any, file?: FileList): Observable<any> {
    const model: any = data;
    const formData: FormData = new FormData();
    for (let i = 0; i < file?.length; i++) {
      formData.append('file1', file[i], file[i].name);
    }
    formData.append('model', JSON.stringify(model));
    return this.http.put<any>(`${environment.apiUrl}/categories`, formData, {
      observe: 'response'
    });
  }

  public insert(data: any, file?: FileList): Observable<any> {
    const model: any = data;
    const formData: FormData = new FormData();
    for (let i = 0; i < file?.length; i++) {
      formData.append('file1', file[i], file[i].name);
    }
    formData.append('model', JSON.stringify(model));
    return this.http.post<any>(`${environment.apiUrl}/categories`, formData, {
      observe: 'response'
    });
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/categories/${id}`);
  }

}
