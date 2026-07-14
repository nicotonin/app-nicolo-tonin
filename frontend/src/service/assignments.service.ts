import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Assegnazioni, AssegnazioniFilters } from './assignments.entity';

@Injectable({ providedIn: 'root' })
export class AssignmentsService {
  protected http = inject(HttpClient);

  list(filters?: AssegnazioniFilters) {
    let params = new HttpParams();
    if (filters?.stato) params = params.set('stato', filters.stato);
    if (filters?.categoria) params = params.set('categoria', filters.categoria);
    if (filters?.corsoId) params = params.set('corsoId', filters.corsoId);
    if (filters?.dipendenteId) params = params.set('dipendenteId', filters.dipendenteId);
    return this.http.get<Assegnazioni[]>(`${environment.apiUrl}/assegnazioni`, { params });
  }

  get(id: string) {
    return this.http.get<Assegnazioni>(`${environment.apiUrl}/assegnazioni/${id}`);
  }

  create(data: Partial<Assegnazioni>) {
    return this.http.post<Assegnazioni>(`${environment.apiUrl}/assegnazioni`, data);
  }

  update(id: string, data: Partial<Assegnazioni>) {
    return this.http.put<Assegnazioni>(`${environment.apiUrl}/assegnazioni/${id}`, data);
  }

  completa(id: string) {
    return this.http.put<Assegnazioni>(`${environment.apiUrl}/assegnazioni/${id}/completa`, {});
  }

  annulla(id: string) {
    return this.http.put<Assegnazioni>(`${environment.apiUrl}/assegnazioni/${id}/annulla`, {});
  }

  remove(id: string) {
    return this.http.delete(`${environment.apiUrl}/assegnazioni/${id}`);
  }
}
