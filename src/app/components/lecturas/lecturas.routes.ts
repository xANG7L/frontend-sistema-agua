import { Routes } from "@angular/router";
import { FormLecturaComponent } from "./form-lectura/form-lectura.component";

export const LECTURA_ROUTES: Routes = [
    {
        path: 'ingreso-lectura',
        component: FormLecturaComponent
    }
]