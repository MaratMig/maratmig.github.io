import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './core/login-form/login-form.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { MainComponent } from './core/main/main.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } // Handle 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
