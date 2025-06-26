import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { Button } from 'primeng/button';
// import { DatePicker } from 'primeng/datepicker';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { InputTextModule } from 'primeng/inputtext';
// import { FloatLabel } from 'primeng/floatlabel';
// import { ButtonModule } from 'primeng/button';
// import { RadioButton } from 'primeng/radiobutton';
import { AccumulatedBudgetItem, BudgetItem, RECURRENCE } from './models';
import dayjs from 'dayjs';
import { NgxFlickeringGridComponent } from '@omnedia/ngx-flickering-grid';
import { ButtonDirective } from '@nx-starter/button';
import { InputComponent } from '@nx-starter/input';
import { RadioComponent } from '@nx-starter/radio';
import { v4 } from 'uuid';
import { CalendarChange, CalendarComponent } from '@nx-starter/calendar';

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
  amount = signal(1000);
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
            description: 'Todays Balance, past amounts are consolidated into a total for today',
          },
          {
            id: v4(),
            date: +dayjs(),
            amount: -120,
            recurring: RECURRENCE.MONTHLY,
            description: 'Budget negative amounts for bills',
          },
          {
            id: v4(),
            date: +dayjs().add(1, 'day'),
            amount: 1500,
            recurring: RECURRENCE.NONE,
            description: 'Budget positive amounts for income',
          },
          {
            id: v4(),
            date: +dayjs().add(2, 'day'),
            amount: -1000,
            recurring: RECURRENCE.NONE,
            description: 'Credit card payment',
          },
          {
            id: v4(),
            date: +dayjs().add(2, 'day'),
            amount: -10,
            recurring: RECURRENCE.NONE,
            description: "Don't",
          },
          {
            id: v4(),
            date: +dayjs().add(2, 'day'),
            amount: -10,
            recurring: RECURRENCE.NONE,
            description: 'track',
          },
          {
            id: v4(),
            date: +dayjs().add(2, 'day'),
            amount: -10,
            recurring: RECURRENCE.NONE,
            description: 'every',
          },
          {
            id: v4(),
            date: +dayjs().add(2, 'day'),
            amount: -10,
            recurring: RECURRENCE.NONE,
            description: 'little',
          },
          {
            id: v4(),
            date: +dayjs().add(2, 'day'),
            amount: -10,
            recurring: RECURRENCE.NONE,
            description: 'expense',
          },
          {
            id: v4(),
            date: +dayjs().add(2, 'day'),
            amount: -10,
            recurring: RECURRENCE.NONE,
            description: 'but you could',
          },
          {
            id: v4(),
            date: +dayjs().add(3, 'day'),
            amount: 1500,
            recurring: RECURRENCE.BIWEEKLY,
            description: 'Salary',
          },
        ],
  );

  emptyItems = signal<BudgetItem[]>(this.generateEmpties());

  tableFormatItems = computed<AccumulatedBudgetItem[]>(() => {
    const empties = this.emptyItems();
    const items = this.budgetItems();
    // only show recurrence for the last item of a category
    const sorted = [...items, ...empties].sort((a, b) => a.date - b.date);
    let total = 0;

    const formatted = sorted.map((item) => {
      total += item.amount;
      return {
        total,
        ...item,
      } as AccumulatedBudgetItem;
    });
    const categories: string[] = [];
    formatted.reverse().map((item) => {
      if (item.recurring !== RECURRENCE.NONE && categories.indexOf(item.description) === -1) {
        categories.push(item.description);
      } else {
        item.hideRecurring = true;
      }
    });
    return formatted.reverse();
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
  groupTotals = computed(() => {
    const totals = this.groupedItems().map((group) => {
      return group.reduce((total, item, index) => {
        let most = 0;
        if (item.total > most) {
          most = item.total;
        }
        return {
          ...total,
          date: item.date,
          total: most,
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
    this.groupTotals().forEach((group) => {
      if (group.total > tallest) {
        tallest = group.total;
      }
    });
    return tallest;
  });

  ngOnInit(): void {
    this.consolidatePastBalanceIntoTodaysBalance();
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
      date: +dayjs(item.date)
        .add(this.getDays(item.recurring), 'day')
        .add(this.getMonths(item.recurring), 'month')
        .toDate(),
    };
    this.add(budgetItem);
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

  barStyle(height: number) {
    const _height = `${(Math.abs(height) / this.tallest()) * this.targetHeight()}px`;
    return {
      height: _height,
      position: height < 0 ? 'absolute' : 'relative',
      top: height < 0 ? `-${_height}` : 'auto',
    };
  }

  generateEmpties(month = 0) {
    return new Array(180)
      .fill({
        id: v4(),
        description: 'Label',
        date: +dayjs().startOf('day').toDate(),
        amount: 0,
      })
      .map((item, i) => ({ ...item, date: +dayjs().startOf('month').add(month, 'month').add(i, 'day').toDate() }));
  }

  onDateChange(change: CalendarChange) {
    const date = new Date(+change.year, +change.month - 1, +change.day);
    this.date.set(dayjs(date));
  }

  goToKofi() {
    window.open('https://ko-fi.com/artesra', '_blank');
  }
}
