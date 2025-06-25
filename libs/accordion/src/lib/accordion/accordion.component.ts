import { CommonModule } from '@angular/common';
import { Component, HostBinding, input } from '@angular/core';
import { StyleDirective } from '@nx-starter/directives';

@Component({
  selector: 'atg-accordion',
  standalone: true,
  imports: [CommonModule, StyleDirective],
  templateUrl: './accordion.component.html',
})
export class AccordionComponent {
  id = input<string>('');
  name = input.required<string>();
  arrow = input<boolean>(false);
  join = input<boolean>(false);
  style = input<'primary' | 'secondary' | 'accent' | 'neutral' | ''>('');
  class = input<string>('');

  @HostBinding('class.collapse') _collapse = true;
  @HostBinding('class.collapse-arrow') get _arrow() {
    return this.arrow();
  }
  @HostBinding('class.join-item') get _join() {
    return this.join();
  }
  @HostBinding('class.border-base-300') get _borderColor() {
    return this.join();
  }
  @HostBinding('class.border') get _border() {
    return this.join();
  }
}
