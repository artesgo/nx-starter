/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, input, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'daisy-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RadioComponent,
    },
  ],
})
export class RadioComponent implements ControlValueAccessor {
  id = input.required<string>();
  style = input<'primary' | 'secondary' | 'accent' | 'ghost' | 'neutral' | 'info'>('primary');
  size = input<'xs' | 'sm' | 'md' | 'lg'>('sm');
  name = input<string>('name');
  formControl = input<FormControl>();
  checked = model(false);
  value = input.required<string>();
  disabled = input(false);
  touched = signal(false);

  writeValue(value: string) {
    this.onTouched();
  }

  onChange = (value: string) => {
    this.checked.set(value === this.value());
  };

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};
  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched()) {
      this.onTouched();
      this.touched.set(true);
    }
  }
}
