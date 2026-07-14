import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from '../../../service/category.entity';
import { CategoryService } from '../../../service/category.service';

@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: './category-modal.component.css',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ item.id ? 'Modifica' : 'Aggiungi' }} Categoria</h4>
    </div>

    <form #categoryForm="ngForm">
    <div class="modal-body">

      <div *ngIf="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

      <div class="mb-3">
        <label class="form-label">Nome</label>
        <input type="text" class="form-control" name="name" [(ngModel)]="item.name" #name="ngModel" required />
        <div *ngIf="name.invalid && name.touched" class="text-danger mt-1">
          Name is required
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Descrizione</label>
        <textarea class="form-control" name="description" [(ngModel)]="item.description" #description="ngModel" required></textarea>
        <div *ngIf="description.invalid && description.touched" class="text-danger mt-1">
          Description is required
        </div>
      </div>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.dismiss()">Annulla</button>
      <button type="button" class="btn btn-primary" [disabled]="categoryForm.invalid || loading" (click)="confirm()">
        <span *ngIf="loading" class="spinner-border spinner-border-sm me-1"></span>
        Conferma
      </button>
    </div>
    </form>
  `
})
export class CategoryModalComponent {

  activeModal = inject(NgbActiveModal);
  private categorySrv = inject(CategoryService);

  item: Partial<Category> = {};
  loading = false;
  errorMessage = '';

  setData(data: Category) {
    this.item = { ...data };
  }

  confirm() {
    this.loading = true;
    this.errorMessage = '';

    const request = this.item.id
      ? this.categorySrv.update(this.item.id, this.item)
      : this.categorySrv.create(this.item);

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
