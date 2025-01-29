import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const userGuard: CanActivateFn = (route, state) => {
  const service = inject(AuthService);
  const router = inject(Router);

  // console.log('AUTH')
  // console.log(service.isAuthenticated)

  if (service.isAuthenticated) {
    return true
  }
  router.navigate(['/login'])
  return false;
};
