import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../utils/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { CorsiComponent } from './pages/corsi/corsi.component';
import { AssegnazioniComponent } from './pages/assegnazioni/assegnazioni.component';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomeComponent
  },
  {
    path: 'corsi',
    canActivate: [authGuard],
    component: CorsiComponent
  },
  {
    path: 'assegnazioni',
    canActivate: [authGuard],
    component: AssegnazioniComponent
  },
  {
    path: 'analytics',
    canActivate: [authGuard],
    component: AnalyticsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
