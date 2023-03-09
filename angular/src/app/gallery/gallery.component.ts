import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GalleryService } from 'src/app/core/services/gallery.service';
import { GalleryImage } from 'src/app/core/interfaces/gallery-image.interface';

import { AuthService } from 'src/app/core/services/auth.service';

import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent {

  galleryImages: Observable<GalleryImage[]>;

  isLoggedIn: boolean = false;
  adminCapabilities: boolean = false;

  constructor(private galleryService: GalleryService, private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.updateGalleryImages();
  }

  uploadGalleryImage(imageData: FormData) {
    this.galleryService.uploadGalleryImage(imageData).subscribe(() => this.updateGalleryImages());
  }


  deleteGalleryImage(imageId: string) {
    this.galleryService.deleteImage(imageId).subscribe(() => this.updateGalleryImages());
  }

  updateGalleryImages() {
    if(this.adminCapabilities)
      this.galleryImages = this.galleryService.getUserImages();
    else 
      this.galleryImages = this.galleryService.getAllGalleryImages();
  }


}
