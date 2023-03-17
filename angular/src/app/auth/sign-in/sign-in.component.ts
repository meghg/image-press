import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { InteractionService } from 'src/app/core/services/interaction.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  public username: string = "";
  public password: string = "";

  constructor(private interactionService: InteractionService, private authService: AuthService, private router: Router) {}

  signOn() {
    this.authService.signOn(this.username, this.password).subscribe(response => {
      this.router.navigate(['/gallery']);
    }, error => {
      this.interactionService.displaySnackBar("Incorrect username or password. Please try again.");
    });
  }

}
