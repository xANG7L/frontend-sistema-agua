import { AuthService } from "../../services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loginError, loginHandler, loginSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { Credencial } from "../../models/credencial";
import { Usuario } from "../../models/usuario";
import { HttpErrorResponse } from "@angular/common/http";
import Swal from "sweetalert2";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthEffects {

    loginHandler$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginHandler),
            exhaustMap((action) => this.service.login(action.username, action.password).pipe(
                map(res => {
                    const credencial: Credencial = new Credencial();
                    credencial.usuario = res.user as Usuario;
                    credencial.isAuth = true;
                    credencial.admin = res.admin;
                    if (typeof window !== 'undefined' && window.localStorage) {
                        sessionStorage.setItem('credenciales', JSON.stringify(credencial));
                    }
                    return loginSuccess({ credencial });
                }),
                catchError((err) => {
                    const error: HttpErrorResponse = err;
                    console.log(error.error);
                    if (error.status == 500) {
                        Swal.fire({
                            icon: "error",
                            title: "Alerta",
                            text: "Error en el servidor, acceso no disponible!",
                        })
                    }
                    return of(loginError(error.error))
                })
            ))
        )
    )

    loginSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(loginSuccess),
        tap((res) => {
            this.snackBar.open(`!Bienvenido al sistema !`, 'X', {
                horizontalPosition: "center",
                verticalPosition: "bottom",
                duration: 2000,
                //panelClass: 'success-snackbar'
            })
            this.router.navigate(['/menu']);
        }
        ))
        , { dispatch: false }
    )


    constructor(
        private actions$: Actions,
        private service: AuthService,
        private snackBar: MatSnackBar,  // Inyectar MatSnackBar
        private router: Router,
    ) { }
}