import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SharingDataService } from './services/sharing-data.service';
import { AuthService } from './services/auth.service';
import Swal from 'sweetalert2';
import { Credencial } from './models/credencial';
import { Usuario } from './models/usuario';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend-sistema-agua';

  constructor(
    private sharingData: SharingDataService,
    private authService: AuthService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.handlerLogin();
  }

  handlerLogin(): void {
    this.sharingData.handlerLoginEventEmitter.subscribe(({ username, password }) => {
      // nada
      this.authService.login(username, password).subscribe({
        next: (res) => {
          console.log(res);
          const credencial: Credencial = new Credencial();
          credencial.usuario = res.usuario as Usuario;
          credencial.isAuth = true;
          credencial.admin = res.admin;
          this.authService.credenciales = credencial;
          Swal.fire(
            'Bienvenido al sistema',
            '',
            'success'
          )
          this.router.navigate(['/menu']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status == 401) {
            Swal.fire('Error', 'Usuario y/o contraseña incorrectas', 'error');
          } else {
            Swal.fire('Error', 'Error inesperado, intentelo mas tarde', 'error');
            throw err;
          }
        }
      })
    });
  }

}
