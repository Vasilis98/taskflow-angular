import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TaskCard} from './task-card/task-card';
import {FormsModule} from '@angular/forms';
import { TaskForm} from './task-form/task-form';

interface Task {
  title: string;
  description: string;
  priority: string;
  date: string | Date;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskCard, FormsModule, TaskForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {

  tasks: Task[] = [
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

  handleTaskCreation(newTask: any) {
    this.tasks.push(newTask);
  }

  removeTask(task: any) {
    this.tasks = this.tasks.filter(t => t !== task);
  }

}

