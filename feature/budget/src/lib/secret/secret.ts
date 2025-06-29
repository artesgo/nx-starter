import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextAreaComponent } from '@nx-starter/input';
import { ButtonDirective } from '@nx-starter/button';
import { Card } from '@nx-starter/card';

@Component({
  selector: 'bgt-secret',
  imports: [CommonModule, FormsModule, TextAreaComponent, ButtonDirective, Card],
  templateUrl: './secret.html',
  styleUrl: './secret.scss',
})
export class Secret {
  secret = signal(
    localStorage.getItem('budget')
      ? JSON.parse(localStorage.getItem('budget') as string)
      : "Doesn't look like anything...",
  );

  setStorage() {
    localStorage.setItem('budget', this.secret());
  }
}
