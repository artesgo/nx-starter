import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from '@nx-starter/checkbox';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [FormsModule, CheckboxComponent, ReactiveFormsModule, FormsModule],
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

  check = new FormControl(false);
  checked = signal(false);
  form = new FormGroup({
    check: this.check,
  });
  reactiveTouched = signal(false);
  modelTouched = signal(false);
}
