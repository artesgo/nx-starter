import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { Button } from 'primeng/button';
// import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
// import { InputTextModule } from 'primeng/inputtext';
// import { FloatLabel } from 'primeng/floatlabel';
// import { ButtonModule } from 'primeng/button';
// import { RadioButton } from 'primeng/radiobutton';
import { AccumulatedBudgetItem, BudgetItem, RECURRENCE } from './models';
import dayjs from 'dayjs';
import { NgxFlickeringGridComponent } from '@omnedia/ngx-flickering-grid';
import { ButtonDirective } from 'ng-daisy-button';
import { InputComponent } from 'ng-daisy-input';
import { RadioComponent } from 'ng-daisy-radio';
import { v4 } from 'uuid';

@Component({
  selector: 'bgt-budget',
  imports: [InputComponent, ButtonDirective, CommonModule, FormsModule, NgxFlickeringGridComponent, RadioComponent],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss',
})
export class BudgetComponent {
  amount = signal(0);
  description = signal('');
  recurring = signal<RECURRENCE>(RECURRENCE.NONE);
  date = signal(dayjs());
  targetHeight = signal(200);
  RECURRENCE = RECURRENCE;
  scale = signal(500);
  budgetItems = signal<BudgetItem[]>(
    localStorage.getItem('budget') ? (JSON.parse(localStorage.getItem('budget') as string) as BudgetItem[]) : [],
  );

  emptyItems = signal<BudgetItem[]>(this.generateEmpties());

  processedItems = computed<AccumulatedBudgetItem[]>(() => {
    const empties = this.emptyItems();
    const items = this.budgetItems();
    const sorted = [...items, ...empties].sort((a, b) => a.date - b.date);
    let total = 0;
    return sorted.map((item) => {
      total += item.amount;
      return {
        total,
        ...item,
      } as AccumulatedBudgetItem;
    });
  });

  /**
   * Group items by day
   */
  groupedItems = computed<AccumulatedBudgetItem[][]>(() => {
    const items = this.processedItems();

    const groups: AccumulatedBudgetItem[][] = [];
    let currentGroup: AccumulatedBudgetItem[] = [];
    items.forEach((item) => {
      if (item.date !== currentGroup[currentGroup.length - 1]?.date) {
        currentGroup = [];
        groups.push(currentGroup);
      }
      currentGroup.push(item);
    });

    return groups;
  });

  /**
   * totals for the bar chart
   */
  groupTotals = computed(() => {
    const totals = this.groupedItems().map((group) => {
      return group.reduce((total, item) => {
        let most = 0;
        if (item.total > most) {
          most = item.total;
        }
        return {
          ...total,
          date: item.date,
          total: most,
        };
      });
    });
    return totals;
  });

  tallest = computed(() => {
    let tallest = 0;
    this.groupTotals().forEach((group) => {
      if (group.total > tallest) {
        tallest = group.total;
      }
    });
    return tallest;
  });

  /**
   * Adds a new item to the budget.
   * The item is created with the current values of date, amount, recurring, and description.
   * The id of the item is a random string.
   */
  addItem() {
    const budgetItem = {
      id: v4(),
      date: +this.date(),
      amount: +this.amount(),
      recurring: this.recurring(),
      description: this.description(),
    };
    this.add(budgetItem);
  }

  removeItem(id: string) {
    this.budgetItems.set([...this.budgetItems().filter((i) => i.id !== id)]);
    localStorage.setItem('budget', JSON.stringify(this.budgetItems()));
  }

  recurr(item: BudgetItem) {
    // TODO: add month to the date, not just add 30 days
    // const month = dayjs(item.date).month();
    const budgetItem = {
      id: v4(),
      amount: item.amount,
      description: item.description,
      recurring: item.recurring,
      date: +dayjs(item.date).add(this.getRecurrence(item), 'day').toDate(),
    };
    this.add(budgetItem);
  }

  private add(item: BudgetItem) {
    this.budgetItems.set([...this.budgetItems(), item]);
    localStorage.setItem('budget', JSON.stringify(this.budgetItems()));
  }

  getRecurrence(item: BudgetItem) {
    switch (item.recurring) {
      case RECURRENCE.WEEKLY:
        return 7;
      case RECURRENCE.BIWEEKLY:
        return 14;
      case RECURRENCE.MONTHLY:
        return 30;
      case RECURRENCE.YEARLY:
        return 365;
      default:
        return 1;
    }
  }

  getRandomHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  barStyle(height: number) {
    return {
      height: `${(height / this.tallest()) * this.targetHeight()}px`,
    };
  }

  generateEmpties(month = 0) {
    return (
      new Array(180)
        // return new Array(dayjs().daysInMonth())
        .fill({
          id: v4(),
          description: 'Label',
          date: +dayjs().startOf('day').toDate(),
          amount: 0,
        })
        .map((item, i) => ({ ...item, date: +dayjs().startOf('month').add(month, 'month').add(i, 'day').toDate() }))
    );
  }
}
