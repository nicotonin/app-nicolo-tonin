import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { authInterceptor } from '../utils/auth.interceptor';
import { logoutInterceptor } from '../utils/logout.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavUserComponent } from './components/nav-user/nav-user.component';
import { IfAuthenticatedDirective } from '../utils/if-authenticated.directive';
import { AppRoutingModule } from './app-routing-module';
import { HomeComponent } from './pages/home/home.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { CorsiComponent } from './pages/corsi/corsi.component';
import { AssegnazioniComponent } from './pages/assegnazioni/assegnazioni.component';

@NgModule({
  declarations: [
    HomeComponent,
    AnalyticsComponent,
    CorsiComponent,
    AssegnazioniComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    NavUserComponent,
    IfAuthenticatedDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
 providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, logoutInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
