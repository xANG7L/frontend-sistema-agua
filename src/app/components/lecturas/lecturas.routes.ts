import { Routes } from "@angular/router";
import { FormLecturaComponent } from "./form-lectura/form-lectura.component";
import { ConsultaLecturasComponent } from "./consulta-lecturas/consulta-lecturas.component";
import { DescargaLecturasComponent } from "./descarga-lecturas/descarga-lecturas.component";
import { userGuard } from "../../auth/guards/user-guard.guard";

export const LECTURA_ROUTES: Routes = [
    {
        path: 'ingreso-lectura',
        component: FormLecturaComponent,
        canActivate: [userGuard]
    },
    {
        path: 'modificar-lectura/:id',
        component: FormLecturaComponent,
        canActivate: [userGuard]
    },
    {
        path: 'consulta-lectura',
        component: ConsultaLecturasComponent,
        canActivate: [userGuard]
    },
    {
        path: 'descarga-lecturas',
        component: DescargaLecturasComponent,
        canActivate: [userGuard]
    }
]