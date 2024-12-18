import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeComponent } from 'ng-daisy';

@Component({
  imports: [RouterModule, ThemeComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'nx-starter';

  theme = signal('cupcake');
}
