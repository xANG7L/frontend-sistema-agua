import { createAction, props } from "@ngrx/store";
import { Credencial } from "../../models/credencial";
import { IUserForm } from "../../components/auth/form-user/form-user.component";

export const loginHandler = createAction('[AuthComponent] loginHandler', props<{ username: string, password: string }>());
export const loginSuccess = createAction('[AuthComponent] loginSuccess', props<{ credencial: Credencial }>());
export const loginError = createAction('[AuthComponent] loginError', props<{ error: any }>());
export const logOut = createAction('[NavbarComponent] logout');

//
export const crearUsuario = createAction('[FormUserComponent] crearUsuario', props<{ usuario: IUserForm }>());
export const usuarioCreado = createAction('[FormUserComponent] usuarioCreado');
export const errorCrearUsuario = createAction('[FormUserComponent] errorCrearUsuario', props<{ errors: any }>());
