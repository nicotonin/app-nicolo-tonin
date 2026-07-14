import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Corsi, CorsiFilters } from './corsi.entity';

@Injectable({ providedIn: 'root' })
export class CorsiService {
  protected http = inject(HttpClient);

  list(filters?: CorsiFilters) {
    let params = new HttpParams();
    if (filters?.categoria) params = params.set('categoria', filters.categoria);
    if (filters?.attivo) params = params.set('attivo', filters.attivo);
    return this.http.get<Corsi[]>(`${environment.apiUrl}/corsis`, { params });
  }

  get(id: string) {
    return this.http.get<Corsi>(`${environment.apiUrl}/corsis/${id}`);
  }

  create(data: Partial<Corsi>) {
    return this.http.post<Corsi>(`${environment.apiUrl}/corsis`, data);
  }

  update(id: string, data: Partial<Corsi>) {
    return this.http.put<Corsi>(`${environment.apiUrl}/corsis/${id}`, data);
  }

  remove(id: string) {
    return this.http.delete(`${environment.apiUrl}/corsis/${id}`);
  }

  disattiva(id: string) {
    return this.http.put<Corsi>(`${environment.apiUrl}/corsis/${id}/disattiva`, {});
  }
}
