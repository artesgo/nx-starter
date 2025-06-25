import { CommonModule } from '@angular/common';
import { Component, computed, effect, ElementRef, input, model, output, viewChildren } from '@angular/core';
import { StyleDirective } from '@nx-starter/directives';
import { OverlayComponent } from '@nx-starter/overlay';

@Component({
  selector: 'atg-dropdown',
  standalone: true,
  imports: [CommonModule, StyleDirective, OverlayComponent],
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
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

  // TODO: convert to ControlValueAccessor

  //#region customizations
  style = input<'primary' | 'secondary' | 'accent' | 'ghost' | 'neutral' | 'info'>('primary');
  size = input<'sm' | 'md' | 'lg' | 'xs'>('md');
  align = input<'start' | 'end'>('start');
  glass = input<boolean>(false);
  //#endregion

  //#region outputs
  select = output<string>();
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

  debugMe(where: string) {
    console.log(where);
  }

  blur = output<Event>();
  onBlur(event: Event) {
    this.blur.emit(event);
  }
}

function focusElement(element: HTMLElement) {
  if (!element) {
    return;
  }
  element.focus();
}
