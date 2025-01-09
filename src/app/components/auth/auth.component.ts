import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Credencial } from '../../models/credencial';
import { Usuario } from '../../models/usuario';
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
    private service: AuthService,
    private router: Router
  ) { }

  onSubmit(loginForm: NgForm) {
    console.log(this.auth)
    this.ingresando = true;
    this.errors = {};
    this.service.login(this.auth.username, this.auth.password).subscribe({
      next: res => {
        const credencial: Credencial = new Credencial();
        credencial.usuario = res.usuario as Usuario;
        credencial.admin = res.admin as boolean;
        credencial.isAuth = true;
        this.ingresando = false;
        if (typeof window !== 'undefined' && window.localStorage) {
          sessionStorage.setItem('credenciales', JSON.stringify(credencial));
        }
        Swal.fire({
          icon: "success",
          title: "Login exitoso",
          text: res.mensaje,
        }).then(() => {
          this.router.navigate(['/menu']);
          // this.router.navigate(['/menu']);
          // this.router.navigate(['/menu']);
          // this.router.navigate(['/menu']);
          // this.router.navigate(['/menu']);

        })
        //setTimeout(() => this.router.navigate(['/menu']), 5000)

      },
      error: err => {
        if (err.status == 500) {
          Swal.fire({
            icon: "error",
            title: "Alerta",
            text: "Error en el servidor, acceso no disponible!",
          })
        }
        this.errors = err.error;
        this.ingresando = false;
      }
    })
  }


}
