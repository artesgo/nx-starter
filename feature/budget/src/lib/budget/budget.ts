import { Routes } from '@angular/router';
import { HowTo } from '../how-to/how-to';
import { BudgetComponent } from './budget.component';

export const routes: Routes = [
  {
    path: '',
    component: BudgetComponent,
  },
  {
    path: 'how-to',
    component: HowTo,
  },
];
