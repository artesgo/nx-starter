import { Component, input } from '@angular/core';
import { StyleDirective } from '@nx-starter/directives';

@Component({
  selector: 'atg-accordion-join',
  standalone: true,
  imports: [StyleDirective],
  template: `
    <div
      class="join join-vertical w-full"
      [atgStyle]="style()"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class AccordionJoinComponent {
  style = input<'primary' | 'secondary' | 'accent' | 'neutral'>('primary');
}
