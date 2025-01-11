import { createAction, props } from "@ngrx/store";
import { Lectura } from "../../models/lectura";

export const obtenerLecturasPorDia = createAction('[ConsultaLecturaComponent] obtenerLecturasPorDia', props<{ fecha: Date }>());
export const listarLecturas = createAction('listarLecturas', props<{ lecturas: Lectura[] }>());

export const descargaExcelDeIngresoDeLecturas = createAction('[DescargaLecturasComponent] descargaExcelDeIngresoDeLecturas', props<{ fecha: Date }>()); 
export const descargaExcelDeIngresoDeLecturasSuccess = createAction('[DescargaLecturasComponent] descargaExcelDeIngresoDeLecturasSuccess'); 
export const descargaExcelDeIngresoDeLecturasError = createAction('[DescargaLecturasComponent] descargaExcelDeIngresoDeLecturasError'); 