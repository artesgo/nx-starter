import { ChangeDetectionStrategy, Component, effect, input, model, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule } from '@angular/forms';
import { DropdownComponent } from '@nx-starter/dropdown';

@Component({
  selector: 'daisy-theme',
  imports: [FormsModule, DropdownComponent],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeComponent implements OnInit {
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
    'cyberpunk',
    'valentine',
  ]);

  themeControl = new FormControl('light');
  theme = model<string>(this.themeControl.value || 'light');

  constructor() {
    this.themeControl.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.theme.set(value || 'light');
    });
  }

  themeChanged = effect(() => {
    document.getElementById('app')?.setAttribute('data-theme', this.theme());
    localStorage.setItem('theme', this.theme());
  });

  ngOnInit(): void {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.theme.set(theme);
    }
  }
}
