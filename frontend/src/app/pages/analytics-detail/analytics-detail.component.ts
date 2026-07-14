
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { AnalyticsService } from '../../../service/analytics.service';

@Component({
  selector: 'app-analytics-detail',
  standalone: false,
  templateUrl: './analytics-detail.component.html',
  styleUrl: './analytics-detail.component.css',
})
export class AnalyticsDetailComponent {

  private route = inject(ActivatedRoute);
  private srv = inject(AnalyticsService);

  item$ = this.route.paramMap.pipe(
    switchMap(params => this.srv.get(params.get('id')!))
  );
}
