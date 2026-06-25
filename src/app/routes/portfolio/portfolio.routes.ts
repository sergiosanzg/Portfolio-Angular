import { Routes } from '@angular/router';

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
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
