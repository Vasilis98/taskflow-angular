import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TaskCard} from './task-card/task-card';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskCard, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {

  tasks = [
    {
      title: 'Fix Login Bug',
      description: 'Users cannot log in with Google.',
      date: 'Jan 24',
      priority: 'High'
    },
    {
      title: 'Design Logo',
      description: 'Create 3 variations for the client.',
      date: 'Feb 01',
      priority: 'Medium'
    },
    {
      title: 'Research Angular',
      description: 'Learn about Components and Inputs.',
      date: 'Today',
      priority: 'Low'
    },
    {
      title: 'Push to GitHub',
      description: 'Upload the latest changes.',
      date: 'Tomorrow',
      priority: 'High'
    }
  ];

  removeTask(task: any) {
    this.tasks = this.tasks.filter(t => t !== task);
  }

  newTaskTitle = '';
  newTaskDescription = '';
  newTaskPriority = 'Low';

  addTask() {
    // VALIDATION
    if (this.newTaskTitle.trim() === '') {
      return;
    }

    // PACKAGING
    const newTask = {
      title: this.newTaskTitle,
      description: this.newTaskDescription,
      priority: this.newTaskPriority,
      date: 'Just now'
    };

    // COMMIT
    this.tasks.push(newTask);

    // RESET
    this.newTaskTitle = '';
    this.newTaskDescription = '';
    this.newTaskPriority = 'Low';
  }
}
