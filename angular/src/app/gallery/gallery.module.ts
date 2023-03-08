import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { GalleryGridComponent } from './gallery-grid/gallery-grid.component';
import { GalleryUploadComponent } from './gallery-upload/gallery-upload.component';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    GalleryComponent,
    GalleryGridComponent,
    GalleryUploadComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    SharedModule
  ]
})
export class GalleryModule { }
