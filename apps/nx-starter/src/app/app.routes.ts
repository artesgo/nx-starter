import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'budget',
    pathMatch: 'full',
  },
  {
    path: 'budget',
    loadChildren: () => import('@nx-starter/budget').then((m) => m.routes),
  },
  {
    path: 'home',
    component: HomeComponent,
  },
];
