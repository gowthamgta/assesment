import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = '';
  password = '';
  errorMessage: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  async register() {
    await this.authService.register(this.username, this.password);
  }
}
