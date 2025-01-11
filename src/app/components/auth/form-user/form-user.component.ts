import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { crearUsuario } from '../../../store/auth/auth.actions';

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
    private store: Store<{ auth: any }>
  ) {
    this.store.select('auth').subscribe(state => {
      this.creando = state.cargando;
      this.errors = state.errors;
    })
  }

  onSubmit(userForm: NgForm): void {
    this.store.dispatch(crearUsuario({ usuario: this.user}));
  }

}
