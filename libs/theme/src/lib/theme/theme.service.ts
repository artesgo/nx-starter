import { effect, Injectable, signal, untracked } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme = signal('lemonade');
  getTheme = effect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      untracked(() => {
        this.theme.set(theme);
      });
    }
  });
  setTheme = effect(() => {
    document.documentElement.setAttribute('data-theme', this.theme());
    localStorage.setItem('theme', this.theme());
  });
}
