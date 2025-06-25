import { Component, signal } from '@angular/core';
import { ThemeComponent } from '@nx-starter/theme';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [ThemeComponent, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  theme = signal('cupcake');
  authState = signal('unauthenticated');

  login() {
    this.authState.set('authenticated');
  }

  logout() {
    this.authState.set('unauthenticated');
  }

  auth() {
    this.authState.set('authorized');
  }

  goToDashboard() {
    console.log('go to dashboard');
  }
}
