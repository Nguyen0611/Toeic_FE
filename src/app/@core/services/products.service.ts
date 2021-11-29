import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../shares/utils/request-util';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {
  }

  query(): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/news/getAll`, {
      observe: 'response'
    });
  }

  doSearchByCode(id: any): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/news-size/${id}`, {
      observe: 'response'
    });
  }

  public doSearch(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/news`, {
      params: options,
      observe: 'response'
    });
  }

  public doSearchAll(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/news-all`, {
      params: options,
      observe: 'response'
    });
  }


  public doSearch1(req?: any, code?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/client/news-by-code`, {
      params: options,
      observe: 'response'
    });
  }
  public doSearch2(id: any): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/client/news-by-id/${id}`, {
      observe: 'response'
    });
  }

  public updateImg(data: any, file?: File): Observable<any> {
    const model: any = data;
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('model', JSON.stringify(model));
    return this.http.put<any>(`${environment.apiUrl}/news-img`, formData, {
      observe: 'response'
    });
  }
  public update(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/news`, data, {
      observe: 'response'
    });
  }

  public insert(data: any,  file?: File): Observable<any> {
    const model: any = data;
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('model', JSON.stringify(model));
    return this.http.post <any>(`${environment.apiUrl}/news`, formData, {
      observe: 'response'
    });
  }

  public newsRefuse(data: any): Observable<any> {
    return this.http.post <any>(`${environment.apiUrl}/news-refuse`, data, {
      observe: 'response'
    });
  }


  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/news/${id}`);
  }

  highlights(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/news-highlights/${id}`);
  }

  offHighlights(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/news-off-highlights/${id}`);
  }

  public insertSizeColor(data: any): Observable<any> {
    return this.http.put <any>(`${environment.apiUrl}/product-size-colors`, data, {
      observe: 'response'
    });
  }

  deleteSizeColor(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/newsSizeColor/${id}`);
  }

}
