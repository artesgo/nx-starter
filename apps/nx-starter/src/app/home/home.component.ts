import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [RouterLink],
})
export class HomeComponent {
  menu = [
    {
      label: 'Link 1',
      value: 'link-1',
    },
    {
      label: 'Link 2',
      value: 'link-2',
    },
    {
      label: 'Link 3',
      value: 'link-3',
    },
    {
      label: 'Link 4',
      value: 'link-4',
    },
    {
      label: 'Link 5',
      value: 'link-5',
    },
  ];
}
