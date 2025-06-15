import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CheckboxComponent } from 'ng-daisy-checkbox';
import { Task } from '../task';

@Component({
  selector: 'atg-task',
  standalone: true,
  imports: [CommonModule, CheckboxComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  task = input.required<Task>();
}
