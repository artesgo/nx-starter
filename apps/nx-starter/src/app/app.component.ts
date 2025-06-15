import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [RouterModule, NavComponent, JsonPipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'nx-starter';

  http = inject(HttpClient);

  toast = this.http.get('http://localhost:4200/api/v1/toaster', {
    headers: { 'Content-Type': 'application/json' },
  });

  $ = {
    toast: toSignal(this.toast),
  };
}
