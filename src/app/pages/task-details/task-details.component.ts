import {Component, Input, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaskService, Task} from '../../services/task.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent {

  private taskService = inject(TaskService);
  private router = inject(Router);

    @Input() id?: string;
    task: Task | undefined;

    ngOnInit() {
      if ( this.id) {
        const taskId = Number(this.id);
        this.task = this.taskService.getTaskById(taskId);
      }
    }

  deleteTask() {
    if (this.task) {
      this.taskService.deleteTask(this.task.id);
      this.router.navigate(['/']);
    }
  }


}
