import { Routes } from "@angular/router";
import { FormLecturaComponent } from "./form-lectura/form-lectura.component";
import { ConsultaLecturasComponent } from "./consulta-lecturas/consulta-lecturas.component";
import { DescargaLecturasComponent } from "./descarga-lecturas/descarga-lecturas.component";

export const LECTURA_ROUTES: Routes = [
    {
        path: 'ingreso-lectura',
        component: FormLecturaComponent
    },
    {
        path: 'consulta-lectura',
        component: ConsultaLecturasComponent
    },
    {
        path: 'descarga-lecturas',
        component: DescargaLecturasComponent
    }
]