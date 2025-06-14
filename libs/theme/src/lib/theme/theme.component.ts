import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { DropdownComponent } from 'ng-daisy-dropdown';
import { ThemeService } from './theme.service';

@Component({
  selector: 'atg-theme',
  standalone: true,
  imports: [CommonModule, DropdownComponent],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss',
})
export class ThemeComponent {
  theme = inject(ThemeService);
  themes = input([
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
    'dim',
    'nord',
    'sunset',
  ]);
}
