import { Routes } from '@angular/router';
import { DashboardComponent } from './shared/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/menu',
        pathMatch: 'full'
    },
    {
        path: 'menu',
        component: DashboardComponent
    },
    {
        path: '',
        loadChildren: () => import('./components/lecturas/lecturas.routes').then(lr => lr.LECTURA_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./components/auth/auth.routes').then(ar => ar.AUTH_ROUTES)
    }
];
