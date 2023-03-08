import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {


  public name: string = "";
  public username: string = "";
  public password: string = "";

  constructor(private authService: AuthService) {}

  signup() {
    this.authService.signUp(this.name, this.username, this.password).subscribe(response => console.log(response));
  }

}
