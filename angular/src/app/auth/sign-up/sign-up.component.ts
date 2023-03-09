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
  public confirmPassword: string = "";

  constructor(private router: Router, private authService: AuthService) {}

  signUp(event: SubmitEvent, confirmPasswordRef: HTMLInputElement) {

    if(this.password !== this.confirmPassword){
      confirmPasswordRef.setCustomValidity('Passwords do not match.');
      confirmPasswordRef.reportValidity();
      return;
    }

    this.authService.signUp(this.name, this.username, this.password).subscribe(response => {
      this.router.navigate(['/gallery']);
    });
  }

}
