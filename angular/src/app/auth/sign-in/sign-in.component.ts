import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  public username: string = "";
  public password: string = "";

  constructor(private router: Router, private authService: AuthService) {}

  signOn() {
    this.authService.signOn(this.username, this.password).subscribe(response => {
      this.router.navigate(['/gallery']);
    });
  }

}
