import { Injectable } from "@angular/core";
import { LecturasService } from "../../services/lecturas.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { descargaExcelDeIngresoDeLecturas, descargaExcelDeIngresoDeLecturasError, descargaExcelDeIngresoDeLecturasSuccess, listarLecturas, obtenerLecturasPorDia } from "./lectura.actions";
import { catchError, EMPTY, exhaustMap, map, of, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import Swal from "sweetalert2";
import e from "express";

@Injectable()
export class LecturaEffects {

    obtenerLecturaPorDia$ = createEffect(() =>
        this.actions$.pipe(
            ofType(obtenerLecturasPorDia),
            exhaustMap((action) => this.service.getLecturasPorDia(action.fecha).pipe(
                map(lecturas => listarLecturas({ lecturas })),
                catchError(() => EMPTY)
            ))
        )
    )

    descargaArchivoExcel$ = createEffect(() =>
        this.actions$.pipe(
            ofType(descargaExcelDeIngresoDeLecturas),
            exhaustMap((action) => this.service.generarExcelDeLecturas(action.fecha).pipe(
                map(res => {
                    const date: string = action.fecha.toString();
                    const anio = date.substring(0,4);
                    const month = date.substring(5,7);
                    const blob = res.body!;
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `LecturasGravadas_${month}_${anio}.xlsx`;
                    link.click();
                    window.URL.revokeObjectURL(url);
                    return descargaExcelDeIngresoDeLecturasSuccess();
                }),
                catchError((err) => {
                    console.log(err);
                    if (err.status == 500) {
                        Swal.fire({
                            title: 'ALERTA',
                            text: 'Error al descargar el excel, error en el servidor',
                            icon: 'error'
                        })
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'Error al descargar el excel, intentelo mas tarde',
                            icon: 'error'
                        })
                    }
                    descargaExcelDeIngresoDeLecturasError();
                    return EMPTY;
                })
            ))
        )
    )

    constructor(
        private service: LecturasService,
        private actions$: Actions
    ) { }
}