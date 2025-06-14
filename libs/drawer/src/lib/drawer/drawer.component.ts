import { CommonModule } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'atg-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent {
  id = input.required<string>();
  open = model(false);
  position = input<'left' | 'right'>('left');
}
