import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective } from '@nx-starter/button';
import { CalendarComponent } from '@nx-starter/calendar';
import { InputComponent } from '@nx-starter/input';
import { RadioComponent } from '@nx-starter/radio';
import dayjs from 'dayjs';
import { FlexPair } from '../flex-pair';

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
    FlexPair,
  ],
  templateUrl: './how-to.html',
  styleUrl: './how-to.scss',
})
export class HowTo {
  recurrence = new FormControl('none');
  year = signal(dayjs().year());
}
