import { createAction, props } from "@ngrx/store";
import { Lectura } from "../../models/lectura";

export const obtenerLecturasPorDia = createAction('[ConsultaLecturaComponent] obtenerLecturasPorDia', props<{ fecha: Date }>());
export const listarLecturas = createAction('listarLecturas', props<{ lecturas: Lectura[] }>());