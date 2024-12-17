import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DaisyComponent } from 'ng-daisy';

@Component({
  imports: [RouterModule, DaisyComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'nx-starter';
}
