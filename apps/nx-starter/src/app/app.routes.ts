import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@nx-starter/budget').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
