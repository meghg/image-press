import { Component, Input, Output, EventEmitter } from '@angular/core';

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
  @Output() uploadImage: EventEmitter<FormData> = new EventEmitter();

  constructor(private galleryService: GalleryService){}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(event: SubmitEvent, fileInput: HTMLInputElement) {
    
    if(!this.selectedFile) return;

    const imageData = new FormData();
    imageData.append('image', this.selectedFile as any);

    fileInput.value = "";

    this.uploadImage.emit(imageData);

  }

}
