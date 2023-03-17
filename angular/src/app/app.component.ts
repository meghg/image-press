import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { InteractionService } from 'src/app/core/services/interaction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'image-press';
  isSignedIn$ = this.authService.getSignedInState();

  isLoading$ = this.interactionService.isLoading$;

  constructor(private authService: AuthService, private interactionService: InteractionService) {
  }

  signOut(event: any) {
    event.preventDefault();
    document.cookie = 'token=; Path=/; Expires=0;';
    window.location.reload();
  }

  ngOnInit(){
    this.authService.validate().subscribe();
  }

}
