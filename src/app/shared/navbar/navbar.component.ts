import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
    private router: Router,
    private service: AuthService
  ){

  }

  logOut(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      sessionStorage.removeItem('credenciales');
    }
   // window.location.reload();
    this.router.navigate(['/login']);
  }

  isAuth(): boolean {
    return this.service.isAdmin();
  }
}
