import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'atg-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './indicator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicatorComponent {
  class = input<string>('');
  style = input<'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error' | 'info'>('primary');
  horizontal = input<'left' | 'center' | 'right'>('right');
  vertical = input<'top' | 'center' | 'bottom'>('top');
}
