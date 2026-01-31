import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {

  @Output() createTask = new EventEmitter<any>();

  newTaskTitle = '';
  newTaskDescription = '';
  newTaskPriority = 'Low';

  submitTask() {
    if (this.newTaskTitle.trim() === '') {
      return;
    }

    // PACKAGING
    const newTask = {
      title: this.newTaskTitle,
      description: this.newTaskDescription,
      priority: this.newTaskPriority,
      date: new Date()
    };

    this.createTask.emit(newTask);

    // RESET
    this.newTaskTitle = '';
    this.newTaskDescription = '';
    this.newTaskPriority = 'Low';

  }
}
