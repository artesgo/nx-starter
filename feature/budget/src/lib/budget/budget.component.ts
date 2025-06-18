import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { AccumulatedBudgetItem, BudgetItem } from './models';
import * as dayjs from 'dayjs';

@Component({
  selector: 'bgt-budget',
  imports: [CommonModule, DatePicker, FormsModule, InputTextModule, FloatLabel, ButtonModule, Checkbox, Button],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss',
})
export class BudgetComponent {
  amount = signal(0);
  description = signal('');
  recurring = signal(false);
  date = signal(dayjs.unix(0));

  budgetItems = signal<BudgetItem[]>([
    {
      id: '1234',
      description: 'Groceries',
      date: +dayjs.unix(0).startOf('day').subtract(6, 'day').toDate(),
      recurring: false,
      amount: 40,
    },
    {
      id: '1235',
      description: 'Groceries',
      date: +dayjs.unix(0).startOf('day').subtract(4, 'day').toDate(),
      recurring: false,
      amount: 30,
    },
    {
      id: '1236',
      description: 'Groceries',
      date: +dayjs.unix(0).startOf('day').subtract(3, 'day').toDate(),
      recurring: false,
      amount: 100,
    },
    {
      id: '1237',
      description: 'Groceries',
      date: +dayjs.unix(0).startOf('day').subtract(1, 'day').toDate(),
      recurring: false,
      amount: 100,
    },
    {
      id: '1238',
      description: 'Phone',
      date: +dayjs.unix(0).startOf('day').toDate(),
      recurring: true,
      amount: 10,
    },
    {
      id: '1239',
      description: 'Mortgage',
      date: +dayjs.unix(0).startOf('day').toDate(),
      recurring: true,
      amount: 1500,
    },
  ]);
  processedItems = computed<AccumulatedBudgetItem[]>(() => {
    const sorted = this.budgetItems().sort((a, b) => a.date - b.date);
    let total = 0;
    return sorted.map((item) => {
      total += item.amount;
      return {
        total,
        ...item,
      } as AccumulatedBudgetItem;
    });
  });

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
      height: `${height / 10}px`,
      display: 'inline-block',
      width: '20px',
      background: this.getRandomHexColor(),
    };
  }
}
