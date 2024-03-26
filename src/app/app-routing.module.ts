import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './core/login-form/login-form.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AlertsDashboardComponent } from './features/alerts/alerts-dashboard/alerts-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'alerts', component: AlertsDashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' } // Handle 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
