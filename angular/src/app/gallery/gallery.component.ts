import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GalleryService } from 'src/app/core/services/gallery.service';
import { GalleryImage } from 'src/app/core/interfaces/gallery-image.interface';

import { AuthService } from 'src/app/core/services/auth.service';

import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { InteractionService } from 'src/app/core/services/interaction.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent {

  galleryImages: Observable<GalleryImage[]>;

  isLoggedIn: boolean = false;
  adminCapabilities: boolean = false;

  constructor(private interactionService: InteractionService, private galleryService: GalleryService, private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.updateGalleryImages();
  }

  uploadGalleryImage(imageData: FormData) {
    this.galleryService.uploadGalleryImage(imageData).subscribe(() => {

      this.updateGalleryImages();
      this.interactionService.displaySnackBar("Uploaded gallery image: " + (imageData.get("image") as any).name);
  });
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
