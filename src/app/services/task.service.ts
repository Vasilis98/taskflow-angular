import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/tasks';

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    this.loadTasks();
  }

  loadTasks() {
    this.http.get<Task[]>(this.apiUrl).subscribe((tasks) => {
      console.log('Τα δεδομένα ήρθαν επιτυχώς από τον server:', tasks);
      this.tasksSubject.next(tasks);
    });
  }

  getTaskById(id: number) {
    return this.tasksSubject.value.find(task => task.id === id);
  }

  addTask(task: Task) {
    const currentTasks = this.tasksSubject.value;

    const newId = currentTasks.length > 0
      ? Math.max(...currentTasks.map(t => t.id)) + 1
      : 1;
    const taskWithId = { ...task, id: newId };

    const updatedTasks = [...currentTasks, taskWithId];
    this.tasksSubject.next(updatedTasks);
  }

  deleteTask(id: number) {
    const currentTasks = this.tasksSubject.value;

    const updatedTasks = currentTasks.filter(task => task.id !== id);
    this.tasksSubject.next(updatedTasks);
  }

  updateTask(updatedTask: Task) {
    const currentTasks = this.tasksSubject.value;
    const index = currentTasks.findIndex(task => task.id === updatedTask.id);

    if (index > -1) {
      const updatedTasks = [...currentTasks];
      updatedTasks[index] = updatedTask;
      this.tasksSubject.next(updatedTasks);
    }
  }
}
