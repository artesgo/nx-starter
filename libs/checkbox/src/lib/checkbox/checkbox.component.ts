import { CommonModule } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'daisy-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: CheckboxComponent, multi: true }],
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent implements ControlValueAccessor {
  size = input<'xs' | 'sm' | 'md' | 'lg'>('md');
  style = input<'primary' | 'secondary' | 'accent' | 'ghost' | 'neutral' | 'info'>('primary');
  id = input.required<string>();
  class = input<string>('');
  name = input<string>('');
  touched = model<boolean>(false);
  reverse = input(false);
  control = input(new FormControl(false));

  constructor() {
    this.control()
      .valueChanges.pipe(takeUntilDestroyed())
      .subscribe((value) => {
        this.onChange(!!value);
      });
  }

  // called when using ngModel
  writeValue(value: boolean): void {
    // called programmatically, not from the template
    this.control().setValue(value);
  }

  // the placeholder onChange to register with the form group
  // it doesn't have to contain any implementation
  onChange = (value: boolean) => {};

  // reports value changes back to the parent form
  registerOnChange(onChange: () => void): void {
    // i don't see this getting called
    // called on initialization
    this.onChange = onChange;
  }

  onTouched = () => {};

  // registers the first instance the user touches the form
  registerOnTouched(onTouched: () => void): void {
    // i don't see this getting called
    this.onTouched = onTouched;
  }

  // manually mark the form as touched
  markAsTouched(): void {
    this.touched.set(true);
    this.onTouched();
  }

  setDisabledState(disabled: boolean): void {
    if (disabled) {
      this.control().disable({ onlySelf: true });
    } else {
      this.control().enable({ onlySelf: true });
    }
  }
}
