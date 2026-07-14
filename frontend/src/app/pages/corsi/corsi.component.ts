import { Component, inject, OnInit } from '@angular/core';
import { CorsiService } from '../../../service/corsi.service';
import { AuthService } from '../../../service/auth.service';
import { Corsi } from '../../../service/corsi.entity';
import { BehaviorSubject, switchMap, of, catchError } from 'rxjs';

@Component({
  selector: 'app-corsi',
  standalone: false,
  templateUrl: './corsi.component.html',
  styleUrl: './corsi.component.css',
})
export class CorsiComponent {
  private srv = inject(CorsiService);
  protected authSrv = inject(AuthService);

  filterCategoria = '';
  filterAttivo = '';

  showForm = false;
  editingItem: Corsi | null = null;
  form: Partial<Corsi> = {};
  formError = '';
  formLoading = false;

  refresh$ = new BehaviorSubject<void>(undefined);

  items$ = this.refresh$.pipe(
    switchMap(() => {
      const filters: any = {};
      if (this.filterCategoria) filters.categoria = this.filterCategoria;
      if (this.filterAttivo) filters.attivo = this.filterAttivo;
      return this.srv.list(filters).pipe(catchError(() => of([])));
    })
  );

  categorie = ['Sicurezza', 'Informatica', 'Lingue', 'Management', 'Compliance', 'Soft Skills', 'Tecnico-Professionale', 'Qualità'];

  openCreate() {
    this.editingItem = null;
    this.form = { titolo: '', descrizione: '', categoria: '', durata: 1, obbligatorio: false, attivo: true };
    this.formError = '';
    this.showForm = true;
  }

  openEdit(item: Corsi) {
    this.editingItem = item;
    this.form = { ...item };
    this.formError = '';
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.editingItem = null;
    this.form = {};
    this.formError = '';
  }

  save() {
    if (!this.form.titolo || !this.form.descrizione || !this.form.categoria || !this.form.durata) {
      this.formError = 'Compila tutti i campi obbligatori';
      return;
    }
    this.formLoading = true;
    this.formError = '';

    const request = this.editingItem
      ? this.srv.update(this.editingItem.id!, this.form)
      : this.srv.create(this.form);

    request.subscribe({
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

  disattiva(item: Corsi) {
    if (confirm(`Disattivare il corso "${item.titolo}"?`)) {
      this.srv.disattiva(item.id!).subscribe(() => this.refresh$.next());
    }
  }

  elimina(item: Corsi) {
    if (confirm(`Eliminare il corso "${item.titolo}"?`)) {
      this.srv.remove(item.id!).subscribe({
        next: () => this.refresh$.next(),
        error: (err) => alert(err.error?.message || 'Errore durante eliminazione')
      });
    }
  }

  filtra() {
    this.refresh$.next();
  }
}
