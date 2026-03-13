import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TaskCardComponent } from '../../task-card/task-card.component';
import { TaskFormComponent } from '../../task-form/task-form.component';
import { TaskService, Task } from '../../services/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskCardComponent, TaskFormComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  private taskService = inject(TaskService);

  filterType: string = 'All';
  editingTask: any = null;

  tasks: Task[] = [];
  private tasksSubscription!: Subscription;

  ngOnInit() {
    this.tasksSubscription = this.taskService.tasks$.subscribe(tasks => {
      console.log('Home took the tasks', tasks);
      this.tasks = tasks;
    });
  }

  ngOnDestroy() {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }

  get filteredTasks() {
    if (this.filterType === 'All') {
      return this.tasks;
    }
    return this.tasks.filter(task => task.priority === this.filterType);
  }


  handleTaskCreation(newTask: any) {
    this.taskService.addTask(newTask);
  }

  removeTask(task: any) {
    this.taskService.deleteTask(task.id);
  }

  openEditModal(task: any) {
    this.editingTask = { ...task };
  }

  closeEditModal() {
    this.editingTask = null;
  }

  saveTask() {
    this.taskService.updateTask(this.editingTask);
    this.closeEditModal();
  }
}
