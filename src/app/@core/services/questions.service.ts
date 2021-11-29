import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../shares/utils/request-util';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  constructor(private http: HttpClient) {
  }

  query(): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/topic`, {
      observe: 'response'
    });
  }
// Hàm lấy ra câu hỏi gọi BE local
  public getQuestions(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/question-answers-category`, {
      params: options,
      observe: 'response'
    });
  }

  public getQuestionsClient(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/list-question-answers-category`, {
      params: options,
      observe: 'response'
    });
  }

  public isCheckQuestionsClient(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/is-check-question-answers-category`, {
      params: options,
      observe: 'response'
    });
  }
  public getQuestionsPart6(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/question-answers-part6`, {
      params: options,
      observe: 'response'
    });
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/question-answers-category/${id}`);
  }
}
