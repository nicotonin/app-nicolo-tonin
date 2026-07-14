
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { HomeService } from '../../../service/home.service';

@Component({
  selector: 'app-home-detail',
  standalone: false,
  templateUrl: './home-detail.component.html',
  styleUrl: './home-detail.component.css',
})
export class HomeDetailComponent {

  private route = inject(ActivatedRoute);
  private srv = inject(HomeService);

  item$ = this.route.paramMap.pipe(
    switchMap(params => this.srv.get(params.get('id')!))
  );
}
