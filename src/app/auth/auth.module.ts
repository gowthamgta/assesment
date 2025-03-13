import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module'; 
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ],
})
export class AuthModule { }
