import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { StatisticaRiepilogo } from './analytics.entity';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  protected http = inject(HttpClient);

  riepilogo(filters?: { mese?: string; categoria?: string; dipendenteId?: string }) {
    let params = new HttpParams();
    if (filters?.mese) params = params.set('mese', filters.mese);
    if (filters?.categoria) params = params.set('categoria', filters.categoria);
    if (filters?.dipendenteId) params = params.set('dipendenteId', filters.dipendenteId);
    return this.http.get<StatisticaRiepilogo[]>(`${environment.apiUrl}/analytics/riepilogo`, { params });
  }
}
