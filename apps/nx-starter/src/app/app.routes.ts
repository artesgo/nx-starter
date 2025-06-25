import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'budget',
    loadChildren: () => import('@nx-starter/budget').then((m) => m.routes),
  },
];
