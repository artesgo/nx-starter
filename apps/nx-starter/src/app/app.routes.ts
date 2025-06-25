import { Route } from '@angular/router';

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
];
