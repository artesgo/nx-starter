export interface BudgetItem {
  id: string;
  description: string;
  date: number;
  amount: number;
  recurring: RECURRENCE;
}

export interface AccumulatedBudgetItem extends BudgetItem {
  total: number;
}

export enum RECURRENCE {
  NONE = 'none',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  BIWEEKLY = 'bi-weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}
