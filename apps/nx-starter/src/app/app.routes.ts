import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'calendar',
    loadChildren: () => import('@nx-starter/calendar').then((m) => m.calendarRoutes),
  },
];
