import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GalleryImage } from 'src/app/core/interfaces/gallery-image.interface'
import { AuthService } from 'src/app/core/services/auth.service'; 

@Injectable({
  providedIn: 'root'
})

export class GalleryService {

  private apiUrl = `http://localhost:3000/gallery`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  uploadGalleryImage(formData: FormData): Observable<GalleryImage> {
    return this.http.post<GalleryImage>(`${this.apiUrl}`, formData, { headers: this.authService.getAuthHeader() });
  }

  getAllGalleryImages(): Observable<GalleryImage[]> {
    return this.http.get<GalleryImage[]>(`${this.apiUrl}/`, { headers: this.authService.getAuthHeader() });
  }

  getUserImages(): Observable<GalleryImage[]> {
    return this.http.get<GalleryImage[]>(`${this.apiUrl}/user`, { headers: this.authService.getAuthHeader() });
  }

  deleteImage(imageId: string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${imageId}`, { headers: this.authService.getAuthHeader() });
  }

  likeImage(imageId: string): Observable<GalleryImage> {
    return this.http.post<GalleryImage>(`${this.apiUrl}/gallery/${imageId}/like`, {}, { headers: this.authService.getAuthHeader() });
  }

}
