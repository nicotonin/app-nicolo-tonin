import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { AssignmentsService } from '../../../service/assignments.service';
import { CorsiService } from '../../../service/corsi.service';
import { Assegnazioni, AssegnazioniFilters } from '../../../service/assignments.entity';
import { Corsi } from '../../../service/corsi.entity';
import { BehaviorSubject, switchMap, of, catchError, map, Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  protected authSrv = inject(AuthService);
  private assignSrv = inject(AssignmentsService);
  private corsiSrv = inject(CorsiService);
  private router = inject(Router);

  currentUser$ = this.authSrv.currentUser$;

  filterStato = '';
  filterCategoria = '';
  filterScadenza = '';

  refresh$ = new BehaviorSubject<void>(undefined);

  corsi$ = this.corsiSrv.list().pipe(catchError(() => of([])));

  assignments$: Observable<Assegnazioni[]> = this.authSrv.currentUser$.pipe(
    switchMap(user => {
      if (!user) return of([]);
      const filters: AssegnazioniFilters = {};
      if (user.role === 'dipendente') {
        filters.dipendenteId = user.id;
      }
      return this.refresh$.pipe(
        switchMap(() =>
          this.assignSrv.list(filters).pipe(catchError(() => of([])))
        )
      );
    })
  );

  dipendenteData$ = combineLatest([this.assignments$, this.corsi$]).pipe(
    map(([assignments, corsi]) => {
      const mappa = new Map<string, Corsi>();
      corsi.forEach(c => mappa.set(c.id!, c));
      return assignments.map(a => ({
        ...a,
        _corsoTitolo: mappa.get(a.corsoId)?.titolo || a.corsoId,
        _corsoCategoria: mappa.get(a.corsoId)?.categoria || '',
        _corsoDurata: mappa.get(a.corsoId)?.durata || 0
      }));
    })
  );

  filteredDipendente$ = this.dipendenteData$.pipe(
    map(items => {
      return items.filter(a => {
        if (this.filterStato && a.stato !== this.filterStato) return false;
        if (this.filterCategoria && a._corsoCategoria !== this.filterCategoria) return false;
        if (this.filterScadenza === 'scaduti') {
          if (a.stato === 'completato' || a.stato === 'annullato') return false;
          return new Date(a.dataScadenza) < new Date();
        }
        if (this.filterScadenza === 'non-completati') {
          return a.stato === 'assegnato' || a.stato === 'scaduto';
        }
        if (this.filterScadenza === 'completati') {
          return a.stato === 'completato';
        }
        return true;
      });
    })
  );

  categorie = ['Sicurezza', 'Informatica', 'Lingue', 'Management', 'Compliance', 'Soft Skills', 'Tecnico-Professionale', 'Qualità'];

  completa(id: string) {
    this.assignSrv.completa(id).subscribe(() => this.refresh$.next());
  }

  openCorsi() { this.router.navigate(['/corsi']); }
  openAssegnazioni() { this.router.navigate(['/assegnazioni']); }
  openAnalytics() { this.router.navigate(['/analytics']); }
}
