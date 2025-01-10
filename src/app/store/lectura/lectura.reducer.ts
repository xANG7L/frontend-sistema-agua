import { createReducer, on } from "@ngrx/store";
import { Lectura } from "../../models/lectura";
import { listarLecturas, obtenerLecturasPorDia } from "./lectura.actions";

export interface ILecturaReducer {
    lecturas: Lectura[];
    cargando: boolean;
}

export const initialState: ILecturaReducer = {
    lecturas: [],
    cargando: false
}

export const lecturaReducer = createReducer(
    initialState,
    on(listarLecturas, (state, { lecturas }) => ({
        lecturas,
        cargando: false
    })),
    on(obtenerLecturasPorDia, (state) => ({
        ...state,
        cargando: true
    }))
)