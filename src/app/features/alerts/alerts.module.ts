import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlertCardsComponent } from './alert-cards/alert-cards.component';
import { AlertsDashboardComponent } from './alerts-dashboard/alerts-dashboard.component';
import { FiltersComponent } from './filters/filters.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    AlertsDashboardComponent,
    FiltersComponent,
    AlertCardsComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AngularMaterialModule,
    RouterModule
  ],
  exports: [
    AlertsDashboardComponent,
    FiltersComponent,
    HeaderComponent
  ]
})
export class AlertsModule { }
