import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  constructor(
    private authService: AuthService
  ) {

  }

  cerrarSesion(): void {
    this.authService.logOut();
  }

  isAuth(): boolean {
    return this.authService.isAuthenticated;
  }

  isAdmin(): boolean {
    return this.authService.isAdmin;
  }
}
