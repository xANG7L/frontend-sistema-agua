import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { crearUsuario } from '../../../store/auth/auth.actions';
import { SharingDataService } from '../../../services/sharing-data.service';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

export interface IUserForm {
  username: string;
  nombre: string;
  password: string;
  admin: boolean;
}

@Component({
  selector: 'form-user',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})
export class FormUserComponent {

  user: IUserForm = {
    username: '',
    nombre: '',
    password: '',
    admin: false
  }

  errors: any = {};

  creando: boolean = false;

  constructor(
    private _authService: AuthService
  ) {

  }

  onSubmit(userForm: NgForm): void {
    this.creando = true;
    this.errors = {};
    this._authService.postCrearUsuario(this.user).subscribe({
      next: () => {
        this.creando = false;
        Swal.fire('Usuario creado correctamente!!', '', 'success');
        userForm.resetForm();
      },
      error: (err: HttpErrorResponse) => {
        this.creando = false;
        if (err.status == 400) {
          this.errors = err.error;
        } else {
          Swal.fire('Ocurrio un error', 'Intente crear el usuario mas tarde', 'error');

        }
      }
    })
    // this.store.dispatch(crearUsuario({ usuario: this.user}));
  }

}
