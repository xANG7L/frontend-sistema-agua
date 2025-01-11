import { Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { userGuard } from "../../auth/guards/user-guard.guard";
import { FormUserComponent } from "./form-user/form-user.component";

export const AUTH_ROUTES: Routes = [
    {
        path: 'login',
        component: AuthComponent
    },
    {
        path: 'crear-usuario',
        component: FormUserComponent,
        canActivate: [userGuard]
    },
]