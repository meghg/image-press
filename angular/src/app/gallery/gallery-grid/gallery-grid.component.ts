import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GalleryService } from 'src/app/core/services/gallery.service';
import { GalleryImage } from 'src/app/core/interfaces/gallery-image.interface';

import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-gallery-grid',
  templateUrl: './gallery-grid.component.html',
  styleUrls: ['./gallery-grid.component.scss']
})
export class GalleryGridComponent {

  @Input() galleryImages: GalleryImage[] | any = [];
  @Input() adminCapabilities: boolean = false;

  @Output() deleteImage: EventEmitter<string> = new EventEmitter();

  constructor(private galleryService: GalleryService){}


}
