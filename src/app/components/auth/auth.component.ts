import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Credencial } from '../../models/credencial';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginHandler } from '../../store/auth/auth.actions';

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
    private store: Store<{ auth: any }>,
    private router: Router
  ) {
    this.store.select('auth').subscribe(state => {
      this.errors = state.errors;
      this.ingresando = state.cargando;
    })
  }

  onSubmit(loginForm: NgForm) {
    console.log(this.auth)
    this.store.dispatch(loginHandler({ username: this.auth.username, password: this.auth.password }));
  }


}
