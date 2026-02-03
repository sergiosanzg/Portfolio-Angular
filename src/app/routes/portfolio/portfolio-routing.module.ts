import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutmePageComponent } from './pages/aboutme-page/aboutme-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from '../Taskify/auth/guards';
import {ExperienceComponent} from "./pages/experience/experience.component";


const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'about',
    component: AboutmePageComponent
  },
  {
    path: 'experience',
    component: ExperienceComponent
  },
  {
    path: 'projects',
    children: [
      {
        path: '',
        component: ProjectsPageComponent
      },
      {
        path: 'weather',
        loadChildren: () => import('../weather/weather.module').then(m => m.WeatherModule)
      },
      {
        path: 'tasks',
        loadChildren: () => import('../tasks/task.module').then(m => m.TaskModule)
      },
      {
        path: 'countries',
        loadChildren: () => import('../countries/countries.module').then(m => m.CountriesModule)
      },
      {
        path: 'flags',
        loadChildren: () => import('../flags/flags.module').then(m => m.FlagsModule)
      },
      {
        path: 'maps',
        loadChildren: () => import('../maps/maps.module').then(m => m.MapsModule)
      },
      {
        path: 'auth',
        canActivate: [isNotAuthenticatedGuard],
        loadChildren: () => import('../Taskify/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'dashboard',
        canActivate: [isAuthenticatedGuard],
        loadChildren: () => import('../Taskify/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class PortfolioRoutingModule { }
