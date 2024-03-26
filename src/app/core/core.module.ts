import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { LoginFormComponent } from './login-form/login-form.component';



@NgModule({
  declarations: [
    SideNavComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    SideNavComponent,
  ]
})
export class CoreModule { }
