import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: "Alerta",
      text: "¿Deseas cerrar sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logOut();
      }
    });
  }

  isAuth(): boolean {
    return this.authService.isAuthenticated;
  }

  isAdmin(): boolean {
    return this.authService.isAdmin;
  }
}
