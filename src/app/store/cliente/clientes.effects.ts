import { Injectable } from "@angular/core";
import { ClienteService } from "../../services/cliente.service";
import { Actions, ofType } from "@ngrx/effects";
import { archivoExcelMigrado, errorSubidaExcel, subirExcelDeClientesParaSincronizarDatos } from "./clientes.actions";
import { EMPTY, catchError, exhaustMap, map, of } from "rxjs";
import Swal from "sweetalert2";

@Injectable()
export class ClienteEffects {

    subidaMasivaDeExcel$ = this.actions.pipe(
        ofType(subirExcelDeClientesParaSincronizarDatos),
        exhaustMap(action => this.service.subidaMasivaDeExcelClientes(action.file).pipe(
            map(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Archivo migrado correctamente",
                    showConfirmButton: false,
                    timer: 1500
                });
                return archivoExcelMigrado();
            }),
            catchError(() => {
                Swal.fire({
                    title: 'ALERTA',
                    text: 'Error al sincronizar excel',
                    icon: 'error'
                })
                return of(errorSubidaExcel());
            })
        ))
    )

    constructor(
        private service: ClienteService,
        private actions: Actions,
    ) { }
}