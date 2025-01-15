import { createAction, props } from "@ngrx/store";

export const subirExcelDeClientesParaSincronizarDatos = createAction('[SubidaArchivosComponent] subirExcelDeClientesParaSincronizarDatos', props<{ file: File }>());
export const archivoExcelMigrado = createAction('[SubidaArchivosComponent] archivoExcelMigrado');
export const errorSubidaExcel = createAction('[SubidaArchivosComponent] errorSubidaExcel');