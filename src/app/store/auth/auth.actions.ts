import { createAction, props } from "@ngrx/store";
import { Credencial } from "../../models/credencial";
import { IUserForm } from "../../components/auth/form-user/form-user.component";

//
export const crearUsuario = createAction('[FormUserComponent] crearUsuario', props<{ usuario: IUserForm }>());
export const usuarioCreado = createAction('[FormUserComponent] usuarioCreado');
export const errorCrearUsuario = createAction('[FormUserComponent] errorCrearUsuario', props<{ errors: any }>());
