import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { SharingDataService } from '../../services/sharing-data.service';
import { AuthService } from '../../services/auth.service';
import { Credencial } from '../../models/credencial';
import { Usuario } from '../../models/usuario';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

export interface AuthRequest {
  username: string;
  password: string;
}


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  auth: AuthRequest = {
    username: '',
    password: ''
  }

  ingresando: boolean = false;

  errors: any = {}

  constructor(
    private authService: AuthService,
    private router: Router
    // private sharingData: SharingDataService,
  ) {
  }

  onSubmit(loginForm: NgForm) {
    this.ingresando = true;
    this.authService.login(this.auth.username, this.auth.password).subscribe({
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
        if (this.authService.isAdmin) {
          this.router.navigate(['/menu']);
        } else {
          this.router.navigate(['/ingreso-lectura']);
        }
        this.ingresando = false;

      },
      error: (err: HttpErrorResponse) => {
        this.ingresando = false;
        if (err.status == 401) {
          Swal.fire('Error', 'Usuario y/o contraseña incorrectas', 'error');
        } else {
          Swal.fire('Error', 'Error inesperado, intentelo mas tarde', 'error');
          throw err;
        }
      }
    })
  }


}
