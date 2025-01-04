import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeComponent } from 'ng-daisy';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [CommonModule, Button, ThemeComponent, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  theme = signal('cupcake');
}
