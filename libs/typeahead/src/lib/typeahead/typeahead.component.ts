/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface TypeaheadOption {
  label: string;
  value: string;
}

@Component({
  selector: 'atg-typeahead',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './typeahead.component.html',
  styleUrl: './typeahead.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TypeaheadComponent,
    },
  ],
})
export class TypeaheadComponent {
  style = input<'primary' | 'secondary' | 'accent' | 'ghost' | 'neutral' | 'info'>('primary');
  size = input<'sm' | 'md' | 'lg' | 'xs'>('md');
  value = '';
  options = input<TypeaheadOption[]>();
  touched = false;
  disabled = false;

  writeValue(value: string) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  onChange = (value: string) => {
    this.value = value;
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
