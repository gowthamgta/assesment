import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService,private router: Router) {}

  async login() {
    this.authService.login(this.username, this.password);
  }

  navigate(){
    this.router.navigate(['/register']);
  }
}
