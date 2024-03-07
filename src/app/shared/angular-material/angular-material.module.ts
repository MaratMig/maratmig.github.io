import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatDividerModule} from '@angular/material/divider';

const modules = [MatSidenavModule, MatButtonModule, MatIconModule, MatCardModule, TextFieldModule, MatDividerModule];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class AngularMaterialModule {}

