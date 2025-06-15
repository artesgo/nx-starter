import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective } from 'ng-daisy-button';
import { InputComponent } from 'ng-daisy-input';
import { Task } from './task';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'atg-task-manager',
  standalone: true,
  imports: [CommonModule, ButtonDirective, TaskComponent, InputComponent, ReactiveFormsModule],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.scss',
})
export class TaskManagerComponent {
  name = new FormControl('', { nonNullable: true });
  description = new FormControl('', { nonNullable: true });
  tasks = signal<Task[]>([]);
  addTask() {
    this.tasks.update((tasks) => [
      ...tasks,
      { id: crypto.randomUUID(), name: this.name.value, description: this.description.value, completed: false },
    ]);
  }
}
