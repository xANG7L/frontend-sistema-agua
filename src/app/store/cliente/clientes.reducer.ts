import { createReducer, on } from "@ngrx/store";
import { archivoExcelMigrado, errorSubidaExcel, subirExcelDeClientesParaSincronizarDatos } from "./clientes.actions";

export interface IClienteReducer {
    cargando: boolean;
}

export const initialState: IClienteReducer = {
    cargando: false
}

export const clienteReducer = createReducer(
    initialState,
    on(subirExcelDeClientesParaSincronizarDatos, (state) => ({
        ...state,
        cargando: true
    })),
    on(archivoExcelMigrado, (state) => ({
        ...state,
        cargando: false
    })),
    on(errorSubidaExcel, (state) => ({
        ...state,
        cargando: false
    })),
)