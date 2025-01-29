import { createReducer, on } from "@ngrx/store";
import { Credencial } from "../../models/credencial";
import { crearUsuario, errorCrearUsuario, usuarioCreado } from "./auth.actions";

export interface IAuthState {
    credencial: Credencial;
    cargando: boolean;
    errors: any;
}

export const initialState: IAuthState = {
    credencial: getCredencialesFromSession(),
    cargando: false,
    errors: {}
}

export const authReducer = createReducer(
    initialState,
    on(crearUsuario, (state) => ({
        ...state,
        cargando: true
    })),
    on(usuarioCreado, (state) => ({
        ...state,
        cargando: false
    })),
    on(errorCrearUsuario, (state, { errors }) => ({
        ...state,
        cargando: false,
        errors
    }))
)

function getCredencialesFromSession(): Credencial {
    if (typeof window !== 'undefined' && window.localStorage) {
        const credencialesString = sessionStorage.getItem('credenciales');
        if (credencialesString) {
            try {
                return JSON.parse(credencialesString);
            } catch (error) {
                console.error('Error parsing credenciales from sessionStorage:', error);
                return new Credencial();
            }
        }
    }
    return new Credencial();
}