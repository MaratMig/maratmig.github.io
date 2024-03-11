import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertsDashboardComponent } from './alerts-dashboard/alerts-dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { FiltersComponent } from './filters/filters.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { AlertCardsComponent } from './alert-cards/alert-cards.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MainComponent } from './main/main.component';



@NgModule({
  declarations: [
    AlertsDashboardComponent,
    HeaderComponent,
    SideNavComponent,
    WidgetsComponent,
    FiltersComponent,
    AlertCardsComponent,
    LoginFormComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    AlertsDashboardComponent,
    HeaderComponent,
    SideNavComponent,
    WidgetsComponent,
    FiltersComponent
  ]
})
export class CoreModule { }
