import { Component, signal } from '@angular/core';
import { ThemeComponent } from 'ng-daisy';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [Button, ThemeComponent, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  theme = signal('cupcake');
  loggedIn = signal(false);

  login() {
    this.loggedIn.set(true);
  }

  logout() {
    this.loggedIn.set(false);
  }
}
