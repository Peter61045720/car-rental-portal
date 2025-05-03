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
    path: '',
    canActivateChild: [authGuard],
    loadComponent: () =>
      import('./shared/components/layouts/user-layout/user-layout.component').then(
        m => m.UserLayoutComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'folder/:id',
        pathMatch: 'full',
      },
      {
        path: 'folder/:id',
        loadComponent: () => import('./folder/folder.page').then(m => m.FolderPage),
      },
    ],
  },
  {
    path: '',
    canActivateChild: [authGuard, roleGuard],
    loadComponent: () =>
      import('./shared/components/layouts/admin-layout/admin-layout.component').then(
        m => m.AdminLayoutComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'admin-folder/:id',
        pathMatch: 'full',
      },
      {
        path: 'admin-folder/:id',
        loadComponent: () => import('./folder/folder.page').then(m => m.FolderPage),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/page-not-found/page-not-found.page').then(m => m.PageNotFoundPage),
  },
];
