/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'daisy-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TextAreaComponent,
    },
  ],
})
export class TextAreaComponent implements ControlValueAccessor {
  style = input<'primary' | 'secondary' | 'accent' | 'ghost' | 'neutral' | 'info'>('primary');
  size = input<'sm' | 'md' | 'lg' | 'xs'>('md');
  id = input.required<string>();
  value = model<string>('');
  name = input<string>('');
  touched = false;
  disabled = false;

  writeValue(value: string) {
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }

  onChange = (value: string) => {
    this.value.set(value);
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
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  updateValue(event: Event) {
    this.writeValue((event.target as HTMLInputElement).value);
  }
}
