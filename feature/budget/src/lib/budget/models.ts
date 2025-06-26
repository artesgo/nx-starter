export interface BudgetItem {
  id: string;
  description: string;
  date: number;
  amount: number;
  recurring: RECURRENCE;
  hideRecurring?: boolean;
}

export interface AccumulatedBudgetItem extends BudgetItem {
  total: number;
  sma: number;
}

export enum RECURRENCE {
  NONE = 'none',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  BIWEEKLY = 'bi-weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}
