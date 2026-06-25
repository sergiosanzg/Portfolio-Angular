import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./routes/portfolio/portfolio.routes').then((m) => m.PORTFOLIO_ROUTES),
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/error404/error404.component').then((m) => m.Error404Component),
  },
];
