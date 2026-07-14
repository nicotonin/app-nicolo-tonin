
import { Component, inject } from '@angular/core';
import { AnalyticsService } from '../../../service/analytics.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, switchMap, of, catchError } from 'rxjs';
import { AuthService } from '../../../service/auth.service';
import { Analytics } from '../../../service/analytics.entity';
import { AnalyticsModalComponent } from '../../components/analytics-modal/analytics-modal.component';

@Component({
  selector: 'app-analytics',
  standalone: false,
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent {

  private srv = inject(AnalyticsService);
  private router = inject(Router);
  private modalService = inject(NgbModal);
  protected authSrv = inject(AuthService);

  refresh$ = new BehaviorSubject<void>(undefined);

  items$ = this.authSrv.isAuthenticated$.pipe(
    switchMap(isAuth => {
      if (!isAuth) return of([]);

      return this.refresh$.pipe(
        switchMap(() =>
          this.srv.list().pipe(
            catchError(err => {
              console.error(err);
              return of([]);
            })
          )
        )
      );
    })
  );

  openAdd() {
    const modalRef = this.modalService.open(AnalyticsModalComponent);

    modalRef.result.then(() => {
      this.refresh$.next();
    }).catch(() => {});
  }

  delete(id: string) {
    this.srv.remove(id).subscribe(() => {
      this.refresh$.next();
    });
  }

  edit(item: Analytics) {
    const modalRef = this.modalService.open(AnalyticsModalComponent);

    modalRef.componentInstance.setData(item);

    modalRef.result.then(() => {
      this.refresh$.next();
    }).catch(() => {});
  }

  openDetail(id: string) {
    this.router.navigate(['/analytics', id]);
  }
}
