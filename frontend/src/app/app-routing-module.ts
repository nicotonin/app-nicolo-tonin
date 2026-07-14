import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../utils/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { AnalyticsDetailComponent } from './pages/analytics-detail/analytics-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeDetailComponent } from './pages/home-detail/home-detail.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'home/:id',
    component: HomeDetailComponent
  },
  {
    path: 'analytics',
    canActivate:[authGuard],
    component: AnalyticsComponent
  },
  {
    path: 'analytics/:id',
    canActivate:[authGuard],
    component: AnalyticsDetailComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
