import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { FiltersComponent } from './filters/filters.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    SideNavComponent,
    WidgetsComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    MainComponent,
    HeaderComponent,
    SideNavComponent,
    WidgetsComponent,
    FiltersComponent
  ]
})
export class CoreModule { }
