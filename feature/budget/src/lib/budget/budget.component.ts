import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective } from '@nx-starter/button';
import { CalendarChange, CalendarComponent } from '@nx-starter/calendar';
import { InputComponent } from '@nx-starter/input';
import { RadioComponent } from '@nx-starter/radio';
import { NgxFlickeringGridComponent } from '@omnedia/ngx-flickering-grid';
import dayjs from 'dayjs';
import { csv2json, json2csv } from 'json-2-csv';
import { v4 } from 'uuid';
import { AccumulatedBudgetItem, BudgetItem, RECURRENCE } from './models';

@Component({
  selector: 'bgt-budget',
  imports: [
    InputComponent,
    ReactiveFormsModule,
    ButtonDirective,
    CommonModule,
    FormsModule,
    NgxFlickeringGridComponent,
    RadioComponent,
    CalendarComponent,
  ],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss',
  standalone: true,
})
export class BudgetComponent implements OnInit {
  year = signal(dayjs().year());

  amount = signal(1000);
  search = signal('');
  description = signal('E.g. Salary');
  recurrence = new FormControl(RECURRENCE.NONE);
  date = signal(dayjs());
  targetHeight = signal(200);
  RECURRENCE = RECURRENCE;
  scale = signal(500);
  budgetItems = signal<BudgetItem[]>(
    localStorage.getItem('budget')
      ? (JSON.parse(localStorage.getItem('budget') as string) as BudgetItem[])
      : [
          {
            id: v4(),
            date: +dayjs(),
            amount: 500,
            recurring: RECURRENCE.NONE,
            description: 'Todays Balance',
          },
          {
            id: v4(),
            date: +dayjs().add(3, 'day'),
            amount: 1500,
            recurring: RECURRENCE.BIWEEKLY,
            description: 'Salary',
          },
          {
            id: v4(),
            date: +dayjs().add(5, 'day'),
            amount: -1500,
            recurring: RECURRENCE.MONTHLY,
            description: 'Credit Card',
          },
          {
            id: v4(),
            date: +dayjs().add(7, 'day'),
            amount: -1500,
            recurring: RECURRENCE.NONE,
            description: 'One off expense',
          },
        ],
  );

  emptyItems = signal<BudgetItem[]>(this.generateEmpties());

  tableFormatItems = computed<AccumulatedBudgetItem[]>(() => {
    const empties = this.emptyItems();
    const items = this.budgetItems();
    const sorted = [...items, ...empties].sort((a, b) => a.date - b.date);
    let total = 0;

    const formatted = sorted.map((item) => {
      total += item.amount;
      return {
        total,
        ...item,
      } as AccumulatedBudgetItem;
    });

    const hideOtherRecurring = this.hideRecurring(formatted) as AccumulatedBudgetItem[];
    return hideOtherRecurring.reverse();
  });

  tableSearchItems = computed(() => {
    return this.tableFormatItems().filter((item) =>
      item.description.toLowerCase().includes(this.search().toLowerCase()),
    );
  });

  /**
   * Group items by day
   */
  groupedItems = computed<AccumulatedBudgetItem[][]>(() => {
    const items = this.tableFormatItems();

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
  barchartItems = computed(() => {
    const totals = this.groupedItems().map((group) => {
      return group.reduce((total, item, index) => {
        let most = 0;
        if (item.total > most) {
          most = item.total;
        }
        return {
          ...total,
          date: item.date,
          total: item.total,
          sma: most / index,
        };
      });
    });
    return totals;
  });

  /**
   * The tallest bar in the chart, used for scaling all bars to 200px
   */
  tallest = computed(() => {
    let tallest = 0;
    this.barchartItems().forEach((group) => {
      if (group.total > tallest) {
        tallest = group.total;
      }
    });
    return tallest;
  });

  ngOnInit(): void {
    this.consolidatePastBalanceIntoTodaysBalance();
  }

  rounded(num: number) {
    return Math.round(num * 100) / 100;
  }

  /**
   * Consolidates all past balance into todays balance
   * This is to keep the chart width consistent
   */
  consolidatePastBalanceIntoTodaysBalance() {
    let balance = 0;
    const futureDatedItems = this.budgetItems().filter((item) => {
      if (dayjs(item.date).isBefore(dayjs())) {
        balance += item.amount;
        balance = this.rounded(balance);
        return false;
      } else {
        return true;
      }
    });

    this.budgetItems.set([
      {
        id: v4(),
        date: +dayjs(),
        amount: balance,
        recurring: RECURRENCE.NONE,
        description: 'Todays Balance',
      },
      ...futureDatedItems,
    ]);
  }

  autoRecurr() {
    const items = this.budgetItems();
    const recurringItems = this.hideRecurring([...items]);
    const autoRecurring = recurringItems.filter((item) => item.hideRecurring === false);
    autoRecurring.forEach((item) => {
      let recurringItem = this.getRecurring(item);
      while (recurringItem.date < +dayjs().add(180, 'day')) {
        this.add({
          id: v4(),
          date: recurringItem.date,
          amount: recurringItem.amount,
          recurring: recurringItem.recurring,
          description: recurringItem.description,
        });
        recurringItem = this.getRecurring(recurringItem);
      }
    });
  }

  hideRecurring(items: Array<BudgetItem | AccumulatedBudgetItem>) {
    const categories: string[] = [];
    return [...items.reverse()].map((item) => {
      if (item.recurring !== RECURRENCE.NONE && categories.indexOf(item.description) === -1) {
        categories.push(item.description);
        item.hideRecurring = false;
      } else {
        item.hideRecurring = true;
      }
      return item;
    });
  }

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
      recurring: this.recurrence.value as RECURRENCE,
      description: this.description(),
    };
    this.add(budgetItem);
  }

  updateItem(id: string, amount: number | string | null) {
    if (!amount) return;
    this.budgetItems.set([...this.budgetItems().map((i) => (i.id === id ? { ...i, amount: +amount } : i))]);
    localStorage.setItem('budget', JSON.stringify(this.budgetItems()));
  }

  removeItem(id: string) {
    this.budgetItems.set([...this.budgetItems().filter((i) => i.id !== id)]);
    localStorage.setItem('budget', JSON.stringify(this.budgetItems()));
  }

  recurr(item: BudgetItem) {
    const budgetItem = this.getRecurring(item);
    this.add(budgetItem);
  }

  getRecurring(item: BudgetItem) {
    return {
      id: v4(),
      amount: item.amount,
      description: item.description,
      recurring: item.recurring,
      date: +dayjs(item.date)
        .add(this.getDays(item.recurring), 'day')
        .add(this.getMonths(item.recurring), 'month')
        .toDate(),
    };
  }

  private add(item: BudgetItem) {
    this.budgetItems.set([...this.budgetItems(), item]);
    localStorage.setItem('budget', JSON.stringify(this.budgetItems()));
  }

  getDays(recurring: RECURRENCE) {
    switch (recurring) {
      case RECURRENCE.WEEKLY:
        return 7;
      case RECURRENCE.BIWEEKLY:
        return 14;
      default:
        return 0;
    }
  }

  getMonths(recurring: RECURRENCE) {
    switch (recurring) {
      case RECURRENCE.MONTHLY:
        return 1;
      case RECURRENCE.YEARLY:
        return 12;
      default:
        return 0;
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

  barStyle(change: number, inTheHole = false, nested = false) {
    const _height = `${(Math.abs(change) / this.tallest()) * this.targetHeight()}px`;
    const top = !inTheHole && nested ? { top: change < 0 ? `-${_height}` : 'auto' } : {};
    const bottom = { bottom: !nested && change < 0 ? `-${_height}` : '0px' };
    return {
      height: _height,
      position: nested && change < 0 ? 'absolute' : 'relative',
      ...top,
      ...bottom,
    };
  }

  generateEmpties(month = 0) {
    return new Array(180)
      .fill({
        id: '1',
        description: 'Label',
        date: +dayjs().startOf('day').toDate(),
        amount: 0,
      })
      .map((item, i) => ({
        ...item,
        id: v4(),
        date: +dayjs().startOf('day').add(month, 'month').add(i, 'day').toDate(),
      }));
  }

  onDateChange(change: CalendarChange) {
    const date = new Date(+change.year, +change.month - 1, +change.day);
    this.date.set(dayjs(date));
  }

  goToKofi() {
    window.open('https://ko-fi.com/artesra', '_blank');
  }

  exportFile() {
    const csv = json2csv(this.budgetItems());
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'budget.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  uploadFile(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0] as File;
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target?.result as string;
      const budgetItems = csv2json(csv);
      this.budgetItems.set(budgetItems as BudgetItem[]);
      // console.log(budgetItems);
    };
    reader.readAsText(file);
  }
}
