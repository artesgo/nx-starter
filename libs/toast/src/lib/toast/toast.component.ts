import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { DaisyStyles, StyleDirective } from 'ng-daisy-directives';

@Component({
  selector: 'atg-toast',
  standalone: true,
  imports: [CommonModule, StyleDirective],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  horizontal = input<'left' | 'center' | 'right'>('center');
  vertical = input<'top' | 'center' | 'bottom'>('bottom');
  style = input<DaisyStyles>('primary');
}
