export interface BudgetItem {
  id: string;
  description: string;
  date: number;
  amount: number;
  recurring: boolean;
}

export interface AccumulatedBudgetItem extends BudgetItem {
  total: number;
}
