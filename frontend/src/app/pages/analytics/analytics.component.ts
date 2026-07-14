import { Component, inject } from '@angular/core';
import { AnalyticsService } from '../../../service/analytics.service';
import { CorsiService } from '../../../service/corsi.service';
import { AssignmentsService } from '../../../service/assignments.service';
import { AuthService } from '../../../service/auth.service';
import { BehaviorSubject, switchMap, of, catchError } from 'rxjs';

@Component({
  selector: 'app-analytics',
  standalone: false,
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent {
  private analyticsSrv = inject(AnalyticsService);
  private corsiSrv = inject(CorsiService);
  private assignSrv = inject(AssignmentsService);
  protected authSrv = inject(AuthService);

  filterMese = '';
  filterCategoria = '';

  refresh$ = new BehaviorSubject<void>(undefined);

  items$ = this.refresh$.pipe(
    switchMap(() => {
      const filters: any = {};
      if (this.filterMese) filters.mese = this.filterMese;
      if (this.filterCategoria) filters.categoria = this.filterCategoria;
      return this.analyticsSrv.riepilogo(filters).pipe(catchError(() => of([])));
    })
  );

  corsiAttivi$ = this.corsiSrv.list({ attivo: 'true' }).pipe(catchError(() => of([])));
  assegnazioniInCorso$ = this.assignSrv.list({ stato: 'assegnato' }).pipe(catchError(() => of([])));

  filtra() { this.refresh$.next(); }

  reset() {
    this.filterMese = '';
    this.filterCategoria = '';
    this.refresh$.next();
  }

  get categorie(): string[] {
    return ['Sicurezza', 'Informatica', 'Lingue', 'Management', 'Compliance', 'Soft Skills', 'Tecnico-Professionale', 'Qualità'];
  }
}
