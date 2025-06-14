import { CommonModule } from '@angular/common';
import { Component, input, model } from '@angular/core';

@Component({
  selector: 'atg-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent {
  size = input<'xs' | 'sm' | 'md' | 'lg'>('md');
  style = input<'primary' | 'secondary' | 'accent' | 'ghost' | 'neutral' | 'info'>('primary');
  id = input.required<string>();
  checked = model<boolean>(false);
  class = input<string>('');
  name = input<string>('');
  reverse = input(false);
}
