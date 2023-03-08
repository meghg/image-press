import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'image-press';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn(); 
  }

  signOut(event: any) {
    event.preventDefault();
    document.cookie = 'token=; Path=/; Expires=0;';
    window.location.reload();
  }

}
