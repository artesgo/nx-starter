import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'atg-divider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './divider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {
  position = input<'start' | 'center' | 'end'>('center');
  vertical = input<boolean>(false);
  style = input<'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error' | 'info'>('neutral');

  @HostBinding('class.self-stretch') get stretch() {
    return this.vertical();
  }
}
