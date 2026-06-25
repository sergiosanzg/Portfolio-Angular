import { Routes } from '@angular/router';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from '../Taskify/auth/guards';

export const PORTFOLIO_ROUTES: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home-page/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/aboutme-page/aboutme-page.component').then((m) => m.AboutmePageComponent),
  },
  {
    path: 'experience',
    loadComponent: () => import('./pages/experience/experience.component').then((m) => m.ExperienceComponent),
  },
  {
    path: 'projects',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/projects-page/projects-page.component').then((m) => m.ProjectsPageComponent),
      },
      {
        path: 'weather',
        loadChildren: () => import('../weather/weather.module').then((m) => m.WeatherModule),
      },
      {
        path: 'tasks',
        loadChildren: () => import('../tasks/task.module').then((m) => m.TaskModule),
      },
      {
        path: 'countries',
        loadChildren: () => import('../countries/countries.module').then((m) => m.CountriesModule),
      },
      {
        path: 'flags',
        loadChildren: () => import('../flags/flags.module').then((m) => m.FlagsModule),
      },
      {
        path: 'maps',
        loadChildren: () => import('../maps/maps.module').then((m) => m.MapsModule),
      },
      {
        path: 'auth',
        canActivate: [isNotAuthenticatedGuard],
        loadChildren: () => import('../Taskify/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'dashboard',
        canActivate: [isAuthenticatedGuard],
        loadChildren: () => import('../Taskify/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
