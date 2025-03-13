import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { getDB, initDB } from '../utils/db';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = signal(false);

  constructor(private router: Router) {
    // Initialize the database when the service is created
    initDB();
  }

  // Login method
  login(username: string, password: string) {
    this.validateUser(username, password).then((isValid) => {
      if (isValid) {
        this.isLoggedIn.set(true);
        this.router.navigate(['/employee']);
      } else {
        alert('Invalid username or password');
      }
    });
  }

  // Registration method
  async register(username: string, password: string) {
    const db = await getDB();
    const user = { username, password }; // Use username instead of email

    // Check if the user already exists
    const existingUser = await db.get('users', username);
    if (existingUser) {
      alert('Username already exists!');
      return;
    }

    // Add the new user to the 'users' object store
    await db.add('users', user);
    alert('Registration successful! Please login.');
    this.router.navigate(['/login']);
  }

  // Logout method
  logout() {
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  // Helper method to validate user credentials
  private async validateUser(username: string, password: string): Promise<boolean> {
    const db = await getDB();
    const user = await db.get('users', username);

    if (user && user.password === password) {
      return true;
    }
    return false;
  }
}