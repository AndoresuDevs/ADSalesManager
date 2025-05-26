import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';

export const AuthGuard: CanActivateFn = () => {
  if (!environment.useAuthGuard) {
    return true; // ⬅️ omite validación si está desactivado
  }

  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) return true;

  router.navigate(['/login']);
  return false;
};