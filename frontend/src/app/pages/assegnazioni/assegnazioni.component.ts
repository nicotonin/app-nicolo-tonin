import { Component, inject } from '@angular/core';
import { AssignmentsService } from '../../../service/assignments.service';
import { CorsiService } from '../../../service/corsi.service';
import { UserService } from '../../../service/user.service';
import { AuthService } from '../../../service/auth.service';
import { Assegnazioni, AssegnazioniFilters } from '../../../service/assignments.entity';
import { Corsi } from '../../../service/corsi.entity';
import { User } from '../../../service/user.entity';
import { BehaviorSubject, switchMap, of, catchError, map, combineLatest } from 'rxjs';

@Component({
  selector: 'app-assegnazioni',
  standalone: false,
  templateUrl: './assegnazioni.component.html',
  styleUrl: './assegnazioni.component.css',
})
export class AssegnazioniComponent {
  private assignSrv = inject(AssignmentsService);
  private corsiSrv = inject(CorsiService);
  private userSrv = inject(UserService);
  protected authSrv = inject(AuthService);

  filterStato = '';
  filterCategoria = '';
  filterCorsoId = '';
  filterDipendenteId = '';

  showForm = false;
  form: Partial<Assegnazioni> = {};
  formError = '';
  formLoading = false;
  fullAssignments: Assegnazioni[] = [];

  refresh$ = new BehaviorSubject<void>(undefined);

  corsi$ = this.corsiSrv.list({ attivo: 'true' }).pipe(catchError(() => of([])));
  dipendenti$ = this.userSrv.list().pipe(
    map(users => users.filter(u => u.role === 'dipendente')),
    catchError(() => of([]))
  );

  items$ = combineLatest([
    this.refresh$.pipe(switchMap(() => this.assignSrv.list(this.buildFilters()).pipe(catchError(() => of([]))))),
    this.corsiSrv.list().pipe(catchError(() => of([]))),
    this.dipendenti$
  ]).pipe(
    map(([assignments, corsi, dipendenti]) => {
      this.fullAssignments = assignments;
      const mappaCorsi = new Map<string, Corsi>();
      corsi.forEach(c => mappaCorsi.set(c.id!, c));
      const mappaUtenti = new Map<string, User>();
      dipendenti.forEach(d => mappaUtenti.set(d.id!, d));
      return assignments.map(a => ({
        ...a,
        _corsoTitolo: mappaCorsi.get(a.corsoId)?.titolo || a.corsoId,
        _corsoCategoria: mappaCorsi.get(a.corsoId)?.categoria || '',
        _dipendenteNome: mappaUtenti.get(a.dipendenteId)
          ? `${mappaUtenti.get(a.dipendenteId)!.firstName} ${mappaUtenti.get(a.dipendenteId)!.lastName}`
          : a.dipendenteId
      }));
    })
  );

  private buildFilters(): AssegnazioniFilters {
    const f: AssegnazioniFilters = {};
    if (this.filterStato) f.stato = this.filterStato;
    if (this.filterCategoria) f.categoria = this.filterCategoria;
    if (this.filterCorsoId) f.corsoId = this.filterCorsoId;
    if (this.filterDipendenteId) f.dipendenteId = this.filterDipendenteId;
    return f;
  }

  categorie = ['Sicurezza', 'Informatica', 'Lingue', 'Management', 'Compliance', 'Soft Skills', 'Tecnico-Professionale', 'Qualità'];

  dateScadenzaErrata(): boolean {
    if (!this.form.dataAssegnazione || !this.form.dataScadenza) return false;
    return new Date(this.form.dataScadenza) < new Date(this.form.dataAssegnazione);
  }

  openCreate() {
    this.form = { corsoId: '', dipendenteId: '', dataAssegnazione: '', dataScadenza: '', stato: 'assegnato' };
    this.formError = '';
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.form = {};
    this.formError = '';
  }

  save() {
    if (!this.form.corsoId || !this.form.dipendenteId || !this.form.dataAssegnazione || !this.form.dataScadenza) {
      this.formError = 'Compila tutti i campi obbligatori';
      return;
    }
    if (new Date(this.form.dataScadenza) < new Date(this.form.dataAssegnazione)) {
      this.formError = 'La data di scadenza non può essere precedente alla data di assegnazione';
      return;
    }
    const duplicato = this.fullAssignments.find(a =>
      a.corsoId === this.form.corsoId &&
      a.dipendenteId === this.form.dipendenteId &&
      a.stato === 'assegnato'
    );
    if (duplicato) {
      this.formError = 'Il corso è già stato assegnato a questo dipendente';
      return;
    }
    this.formLoading = true;
    this.formError = '';

    this.assignSrv.create(this.form).subscribe({
      next: () => {
        this.formLoading = false;
        this.closeForm();
        this.refresh$.next();
      },
      error: (err) => {
        this.formLoading = false;
        this.formError = err.error?.message || 'Errore durante il salvataggio';
      }
    });
  }

  annulla(id: string) {
    if (confirm('Annullare questa assegnazione?')) {
      this.assignSrv.annulla(id).subscribe({
        next: () => this.refresh$.next(),
        error: (err) => alert(err.error?.message || 'Errore')
      });
    }
  }

  elimina(id: string) {
    if (confirm('Eliminare questa assegnazione?')) {
      this.assignSrv.remove(id).subscribe({
        next: () => this.refresh$.next(),
        error: (err) => alert(err.error?.message || 'Errore')
      });
    }
  }

  filtra() {
    this.refresh$.next();
  }
}
