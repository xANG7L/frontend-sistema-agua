import { Routes } from "@angular/router";
import { SubidaArchivosComponent } from "./subida-archivos/subida-archivos.component";
import { ReportesAuxiliaresComponent } from "./reportes/reportes-auxiliares/reportes-auxiliares.component";

export const UTILS_ROUTES: Routes = [
    {
        path: 'subida-archivos',
        component: SubidaArchivosComponent
    },
    {
        path: 'reportes-auxiliares',
        component: ReportesAuxiliaresComponent
    },
]