import { Routes } from '@angular/router';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { userGuard } from './auth/guards/user-guard.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/menu',
        pathMatch: 'full'
    },
    {
        path: 'menu',
        component: DashboardComponent,
        canActivate: [userGuard]
    },
    {
        path: '',
        loadChildren: () => import('./components/lecturas/lecturas.routes').then(lr => lr.LECTURA_ROUTES),
        canActivate: [userGuard]
    },
    {
        path: '',
        loadChildren: () => import('./components/auth/auth.routes').then(ar => ar.AUTH_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./components/utils/utils.routes').then(u => u.UTILS_ROUTES)
    }
];
