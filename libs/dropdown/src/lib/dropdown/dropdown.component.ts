/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import { Component, computed, effect, ElementRef, input, model, output, viewChildren } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { StyleDirective } from '@nx-starter/directives';
import { OverlayComponent } from '@nx-starter/overlay';

@Component({
  selector: 'atg-dropdown',
  standalone: true,
  imports: [CommonModule, StyleDirective, OverlayComponent, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DropdownComponent,
      multi: true,
    },
  ],
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent implements ControlValueAccessor {
  //#region options
  options = input.required<string[] | { label: string; value: string }[]>();
  values = computed((): string[] => {
    const options = this.options();
    return options.map((option) => (typeof option === 'string' ? option : option.value));
  });
  labels = computed((): string[] => {
    const options = this.options();
    return options.map((option) => (typeof option === 'string' ? option : option.label));
  });
  //#endregion

  //#region state
  open = model(false);
  openEffect = effect(() => {
    if (this.open()) {
      setTimeout(() => this.buttons()[0].nativeElement.focus(), 10);
    }
  });
  //#endregion

  //#region customizations
  style = input<'primary' | 'secondary' | 'accent' | 'ghost' | 'neutral' | 'info'>('primary');
  size = input<'sm' | 'md' | 'lg' | 'xs'>('md');
  align = input<'start' | 'end'>('start');
  glass = input<boolean>(false);
  //#endregion

  control = input(new FormControl(''));
  //#region outputs
  touched = model<boolean>(false);
  // select = output<string>();
  //#endregion

  // internal
  buttons = viewChildren<ElementRef>('option');
  preventDefaultList = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];
  focusFirst(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      const element = this.buttons()[0];
      focusElement(element.nativeElement);
      event.preventDefault();
      event.stopPropagation();
    }
  }
  // TODO:
  // detect if more room above / below to dynamically adjust menu position

  // react to keys
  keydown(event: KeyboardEvent, index: number) {
    if (this.preventDefaultList.includes(event.key)) {
      this.preventDefault(event, index);
    }
  }

  // react to arrow keys and navigate list
  // preventDefault on these actions
  preventDefault(event: KeyboardEvent, index: number) {
    event.preventDefault();
    event.stopPropagation();
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      const element = this.buttons()[index + 1];
      focusElement(element.nativeElement);
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      const element = this.buttons()[index - 1];
      focusElement(element.nativeElement);
    }
  }

  blur = output<Event>();
  onBlur(event: Event) {
    this.blur.emit(event);
  }

  constructor() {
    this.control()
      .valueChanges.pipe(takeUntilDestroyed())
      .subscribe((value) => {
        this.onChange(value);
      });
  }

  // called when using ngModel
  writeValue(value: string): void {
    // called programmatically, not from the template
    this.control().setValue(value);
  }

  // the placeholder onChange to register with the form group
  // it doesn't have to contain any implementation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (value: string | null) => {};

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

function focusElement(element: HTMLElement) {
  if (!element) {
    return;
  }
  element.focus();
}
