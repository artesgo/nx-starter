import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from '@nx-starter/button';
import { InputComponent } from '@nx-starter/input';
import { RadioComponent } from '@nx-starter/radio';
import { CalendarComponent } from '@nx-starter/calendar';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import dayjs from 'dayjs';

@Component({
  selector: 'bgt-how-to',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonDirective,
    InputComponent,
    RadioComponent,
    CalendarComponent,
  ],
  templateUrl: './how-to.html',
  styleUrl: './how-to.scss',
})
export class HowTo {
  recurrence = new FormControl('none');
  year = signal(dayjs().year());
}
