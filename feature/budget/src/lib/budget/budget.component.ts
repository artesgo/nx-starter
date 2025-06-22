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
import { NgxBorderBeamComponent } from '@omnedia/ngx-border-beam';
import { NgxShineBorderComponent } from '@omnedia/ngx-shine-border';
import { ButtonDirective } from 'ng-daisy-button';
import { InputComponent } from 'ng-daisy-input';

@Component({
  selector: 'bgt-budget',
  imports: [
    InputComponent,
    ButtonDirective,
    CommonModule,
    FormsModule,
    NgxFlickeringGridComponent,
    NgxBorderBeamComponent,
    NgxShineBorderComponent,
  ],
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

  budgetItems = signal<BudgetItem[]>([
    {
      id: '1234',
      description: 'Starting',
      date: +dayjs('2025-06-09').toDate(),
      recurring: RECURRENCE.NONE,
      amount: 5459.91,
    },
    {
      id: '1235',
      description: 'Credit Card',
      date: +dayjs('2025-06-11').toDate(),
      recurring: RECURRENCE.NONE,
      amount: -1000,
    },
    {
      id: '1236',
      description: 'Salary',
      date: +dayjs('2025-06-12').toDate(),
      recurring: RECURRENCE.BIWEEKLY,
      amount: 3033.84,
    },
    {
      id: '1237',
      description: 'Mortgage',
      date: +dayjs('2025-06-15').toDate(),
      recurring: RECURRENCE.MONTHLY,
      amount: -4100,
    },
    {
      id: '1238',
      description: 'ATM',
      date: +dayjs('2025-06-16').toDate(),
      recurring: RECURRENCE.NONE,
      amount: -100,
    },
    {
      id: '1236',
      description: 'Salary',
      date: +dayjs('2025-06-26').toDate(),
      recurring: RECURRENCE.BIWEEKLY,
      amount: 3033.84,
    },
  ]);

  emptyItems = signal<BudgetItem[]>(this.generateEmpties());

  processedItems = computed<AccumulatedBudgetItem[]>(() => {
    const empties = this.emptyItems();
    const sorted = [...this.budgetItems(), ...empties].sort((a, b) => a.date - b.date);
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
   * Group items by day, with the chang
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

  addItem() {
    this.budgetItems.update((items) => [
      ...items,
      {
        id: Math.random().toString(),
        date: +this.date(),
        amount: +this.amount(),
        recurring: this.recurring(),
        description: this.description(),
      },
    ]);
  }

  removeItem(id: string) {
    this.budgetItems.set([...this.budgetItems().filter((i) => i.id !== id)]);
  }

  recurr(item: BudgetItem) {
    this.budgetItems.update((items) => [
      ...items,
      {
        ...item,
        date: +dayjs(item.date).add(this.getRecurrence(item), 'day').toDate(),
      },
    ]);
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
          id: '-1',
          description: 'Label',
          date: +dayjs().startOf('day').toDate(),
          amount: 0,
        })
        .map((item, i) => ({ ...item, date: +dayjs().startOf('month').add(month, 'month').add(i, 'day').toDate() }))
    );
  }
}
