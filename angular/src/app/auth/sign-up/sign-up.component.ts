import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  public name: string = "";
  public username: string = "";
  public password: string = "";

  constructor(private router: Router, private authService: AuthService) {
  }

  signUp() {
    this.authService.signUp(this.name, this.username, this.password).subscribe(response => {
      this.router.navigate(['/gallery']);
    });
  }

}
