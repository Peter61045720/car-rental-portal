import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs';

export const roleGuard: CanActivateChildFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.checkAuth().pipe(
    take(1),
    map(data => {
      if (data.user?.isAdmin) {
        return true;
      } else {
        router.navigateByUrl('/login');
        return false;
      }
    })
  );
};
