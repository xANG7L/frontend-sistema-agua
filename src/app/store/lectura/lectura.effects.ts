import { Injectable } from "@angular/core";
import { LecturasService } from "../../services/lecturas.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { listarLecturas, obtenerLecturasPorDia } from "./lectura.actions";
import { catchError, EMPTY, exhaustMap, map, of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

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


    constructor(
        private service: LecturasService,
        private actions$: Actions
    ) { }
}