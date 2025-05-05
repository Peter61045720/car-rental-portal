import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { roleGuard } from './shared/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/components/layouts/guest-layout/guest-layout.component').then(
        m => m.GuestLayoutComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
      },
      {
        path: 'registration',
        loadComponent: () =>
          import('./pages/registration/registration.page').then(m => m.RegistrationPage),
      },
    ],
  },
  {
    path: 'app',
    canActivateChild: [authGuard],
    loadComponent: () =>
      import('./shared/components/layouts/user-layout/user-layout.component').then(
        m => m.UserLayoutComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'cars',
        pathMatch: 'full',
      },
      {
        path: 'cars',
        loadComponent: () => import('./pages/car/list/car-list.page').then(m => m.CarListPage),
      },
      {
        path: 'car/:id',
        loadComponent: () =>
          import('./pages/car/details/car-details.page').then(m => m.CarDetailsPage),
      },
    ],
  },
  {
    path: 'admin',
    canActivateChild: [authGuard, roleGuard],
    loadComponent: () =>
      import('./shared/components/layouts/admin-layout/admin-layout.component').then(
        m => m.AdminLayoutComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'cars',
        pathMatch: 'full',
      },
      {
        path: 'cars',
        loadComponent: () => import('./pages/car/list/car-list.page').then(m => m.CarListPage),
      },
      {
        path: 'add-car',
        loadComponent: () => import('./pages/car/add/add-car.page').then(m => m.AddCarPage),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/page-not-found/page-not-found.page').then(m => m.PageNotFoundPage),
  },
];
