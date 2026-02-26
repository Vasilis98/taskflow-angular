import { Injectable } from '@angular/core';


export interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  date: string | Date;
}


@Injectable({
  providedIn: 'root'
})

export class TaskService {

  tasks: Task[] = [
    {
      id: 1,
      title: 'Fix Login Bug',
      description: 'Users cannot log in with Google.',
      date: 'Jan 24',
      priority: 'High'
    },
    {
      id: 2,
      title: 'Design Logo',
      description: 'Create 3 variations for the client.',
      date: 'Feb 01',
      priority: 'Medium'
    },
    {
      id: 3,
      title: 'Research Angular',
      description: 'Learn about Components and Inputs.',
      date: 'Today',
      priority: 'Low'
    }
  ];

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: number) {
    return this.tasks.find(task => task.id === id);
  }

  addTask(task: Task) {
    const newId = this.tasks.length > 0
    ? Math.max(...this.tasks.map(task => task.id)) + 1
      : 1;
    const taskWithId = {
      ...task,
      id: newId
    };
    this.tasks.push(taskWithId);
  }

  deleteTask(id: number) {
    return this.tasks = this.tasks.filter(task => task.id !== id);
  }

  updateTask(updatedTask: Task) {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index > -1) {
      this.tasks[index] = updatedTask;
    }
  }
}
