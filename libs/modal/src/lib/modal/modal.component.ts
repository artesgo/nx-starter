import { CommonModule } from '@angular/common';
import { Component, input, model } from '@angular/core';

@Component({
  selector: 'atg-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  open = model(false);
  position = model<'top' | 'middle' | 'bottom'>('middle');
  class = input('');
  width = input('w-1/2');
}
