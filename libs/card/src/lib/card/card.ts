import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'daisy-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  size = input<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  style = input<'primary' | 'secondary' | 'accent' | 'ghost' | 'neutral' | 'info'>('primary');
  imageFull = input<boolean>(false);
  imageSide = input<boolean>(false);
  bordered = input<boolean>(true);
}
