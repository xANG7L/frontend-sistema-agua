import { AuthService } from "../../services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { crearUsuario, errorCrearUsuario, usuarioCreado } from "./auth.actions";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { Credencial } from "../../models/credencial";
import { Usuario } from "../../models/usuario";
import { HttpErrorResponse } from "@angular/common/http";
import Swal from "sweetalert2";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthEffects {

    crearUsuario$ = createEffect(() => this.actions$.pipe(
        ofType(crearUsuario),
        exhaustMap(action => this.service.postCrearUsuario(action.usuario).pipe(
            map((res) =>{
                Swal.fire({
                    title: 'Registardo',
                    icon: 'success',
                    text: 'Usuario creado exitosamente'
                })
                return usuarioCreado();
            }),
                
            catchError((err) => of(errorCrearUsuario({ errors: err.error })))
        ))
    ))

    constructor(
        private actions$: Actions,
        private service: AuthService,
        private snackBar: MatSnackBar,  // Inyectar MatSnackBar
        private router: Router,
    ) { }
}