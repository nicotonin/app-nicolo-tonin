
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Analytics } from './analytics.entity';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  protected http = inject(HttpClient);

  list() {
    return this.http.get<Analytics[]>(
      `${environment.apiUrl}/analyticss`
    );
  }

  get(id: string) {
    return this.http.get<Analytics>(
      `${environment.apiUrl}/analyticss/${id}`
    );
  }

  create(data: Partial<Analytics>) {
    return this.http.post<Analytics>(
      `${environment.apiUrl}/analyticss`,
      data
    );
  }

  update(id: string, body: Partial<Analytics>) {
    return this.http.put<Analytics>(
      `${environment.apiUrl}/analyticss/${id}`,
      body
    );
  }

  remove(id: string) {
    return this.http.delete(
      `${environment.apiUrl}/analyticss/${id}`
    );
  }
}
