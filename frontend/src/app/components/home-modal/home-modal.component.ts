
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Home } from '../../../service/home.entity';
import { HomeService } from '../../../service/home.service';

@Component({
  selector: 'app-home-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: './home-modal.component.css',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ item.id ? 'Modifica' : 'Aggiungi' }} Home</h4>
    </div>

    <form #form="ngForm">
    <div class="modal-body">

      <div *ngIf="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

      <div class="mb-3">
        <label class="form-label">Name</label>
        <input type="text" class="form-control" name="name" [(ngModel)]="item.name" #name="ngModel" required />
        <div *ngIf="name.invalid && name.touched" class="text-danger mt-1">
          Name is required
        </div>
      </div>

    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.dismiss()">Annulla</button>
      <button type="button" class="btn btn-primary" [disabled]="form.invalid || loading" (click)="confirm()">
        <span *ngIf="loading" class="spinner-border spinner-border-sm me-1"></span>
        Conferma
      </button>
    </div>
    </form>
  `
})
export class HomeModalComponent {

  activeModal = inject(NgbActiveModal);
  private srv = inject(HomeService);

  item: Partial<Home> = {};
  loading = false;
  errorMessage = '';

  setData(data: Home) {
    this.item = { ...data };
  }

  confirm() {
    this.loading = true;
    this.errorMessage = '';

    const request = this.item.id
      ? this.srv.update(this.item.id, this.item)
      : this.srv.create(this.item);

    request.subscribe({
      next: (result) => {
        this.activeModal.close(result);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'An unexpected error occurred';
      }
    });
  }
}
