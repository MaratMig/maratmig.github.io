import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { AlertsModule } from './features/alerts/alerts.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    AlertsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
