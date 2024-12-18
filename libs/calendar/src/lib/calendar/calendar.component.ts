import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { Scroller } from 'primeng/scroller';

import { CalendarEvent } from './event';

@Component({
  selector: 'daisy-calendar',
  imports: [CommonModule, DatePicker, FormsModule, InputTextModule, FloatLabel, ButtonModule, Scroller, Checkbox],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  start = signal(new Date());
  end = signal(new Date());
  task = signal('');
  tasks = signal<CalendarEvent[]>([]);

  submit() {
    const start = this.start();
    const end = this.end();
    this.tasks.set([
      ...this.tasks(),
      { title: this.task(), created: new Date(), start, due: end, done: false },
    ]);
  }
}
