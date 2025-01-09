import { createAction, props } from "@ngrx/store";
import { Credencial } from "../../models/credencial";

export const loginHandler = createAction('[AuthComponent] loginHandler', props<{ username: string, password: string }>());
export const loginSuccess = createAction('[AuthComponent] loginSuccess', props<{ credencial: Credencial }>());
export const loginError = createAction('[AuthComponent] loginError', props<{ error: any }>());
export const logOut = createAction('[NavbarComponent] logout');