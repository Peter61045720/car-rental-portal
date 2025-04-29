import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () => import('./folder/folder.page').then(m => m.FolderPage),
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
  {
    path: '**',
    loadComponent: () =>
      import('./pages/page-not-found/page-not-found.page').then(m => m.PageNotFoundPage),
  },
];
