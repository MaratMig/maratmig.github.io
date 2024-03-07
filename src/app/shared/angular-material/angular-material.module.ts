import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {TextFieldModule} from '@angular/cdk/text-field';

const modules = [MatSidenavModule, MatButtonModule, MatIconModule, MatCardModule, TextFieldModule];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class AngularMaterialModule {}

