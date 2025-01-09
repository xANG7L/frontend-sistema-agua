import { createReducer, on } from "@ngrx/store";
import { Credencial } from "../../models/credencial";
import { loginError, loginSuccess, logOut } from "./auth.actions";

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
    on(loginSuccess, (state, { credencial }) => ({
        credencial,
        errors: {},
        cargando: false
    })),
    on(loginError, (state, { error }) => ({
        ...state,
        errors: error,
        cargando: false
    })),
    on(logOut, (state) => ({
        ...state,
        credencial: new Credencial
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