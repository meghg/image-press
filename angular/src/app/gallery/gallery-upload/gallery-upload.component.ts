import { Component, Input } from '@angular/core';

import { GalleryService } from 'src/app/core/services/gallery.service';

@Component({
  selector: 'app-gallery-upload',
  templateUrl: './gallery-upload.component.html',
  styleUrls: ['./gallery-upload.component.scss']
})
export class GalleryUploadComponent {

  public imageName = '';
  public imageDescription = '';
  public selectedFile: File | undefined;

  @Input() disableUpload: boolean = true;

  constructor(private galleryService: GalleryService){}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  onSubmit() {
    
    const formData = new FormData();
    formData.append('image', this.selectedFile as any);
    formData.append('imageName', this.imageName);
    formData.append('imageDescription', this.imageDescription);

    this.galleryService.uploadGalleryImage(formData).subscribe(response => {
      console.log(response);
    });

  }

}
