
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { HttpClientModule } from '@angular/common/http';

const MaterialModules = [
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatGridListModule,
  MatTabsModule,
  MatRippleModule,
  MatIconModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule
];

/**
 * this module should be imported in every sub-modules
 * you can define here the modules, components, pipes that you want to re-use all over your app
 */
export const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  HttpClientModule,
  ...MaterialModules,
];

export const declarations = [];

@NgModule({
  imports: modules,
  exports: [...modules, ...declarations],
  declarations,
})
export class SharedModule {}