import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-daisy',
  imports: [CommonModule],
  templateUrl: './daisy.component.html',
  styleUrl: './daisy.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaisyComponent {}
