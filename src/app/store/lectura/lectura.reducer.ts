import { createReducer, on } from "@ngrx/store";
import { Lectura } from "../../models/lectura";
import { descargaExcelDeIngresoDeLecturas, descargaExcelDeIngresoDeLecturasError, descargaExcelDeIngresoDeLecturasSuccess, listarLecturas, obtenerLecturasPorDia } from "./lectura.actions";
import { Cliente } from "../../models/cliente";

export interface ILecturaReducer {
    lecturas: Lectura[];
    cargando: boolean;
    cliente: Cliente;
    lectura: Lectura;
}

export const initialState: ILecturaReducer = {
    lecturas: [],
    cargando: false,
    cliente: new Cliente(),
    lectura: new Lectura()
}

export const lecturaReducer = createReducer(
    initialState,
    on(listarLecturas, (state, { lecturas }) => ({
        ...state,
        lecturas,
        cargando: false
    })),
    on(obtenerLecturasPorDia, (state) => ({
        ...state,
        cargando: true
    })),
    on(descargaExcelDeIngresoDeLecturas, (state) => ({
        ...state,
        cargando: true
    })),
    on(descargaExcelDeIngresoDeLecturasSuccess, (state) => ({
        ...state,
        cargando: false
    })),
    on(descargaExcelDeIngresoDeLecturasError, (state) => ({
        ...state,
        cargando: false
    }))
)