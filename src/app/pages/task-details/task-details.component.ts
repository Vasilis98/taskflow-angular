import {Component, Input, inject, OnInit} from '@angular/core';
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
export class TaskDetailsComponent implements OnInit {

  private taskService = inject(TaskService);
  private router = inject(Router);

    @Input() id?: string;
    task: Task | undefined;

    ngOnInit() {
      if ( this.id) {
        const taskId = Number(this.id);
        this.task = this.taskService.getTaskById(taskId);
        console.log('Τα δεδομένα φορτώθηκαν στο OnInit. Το task είναι:', this.task);
      }
    }

  deleteTask() {
    console.log('Το κουμπί Delete πατήθηκε!');
    if (this.task) {
      console.log('Το task βρέθηκε! Προχωράω σε διαγραφή του ID:', this.task.id);
      this.taskService.deleteTask(this.task.id);
      console.log('Η διαγραφή στο Service ολοκληρώθηκε.');
      this.router.navigate(['/']).then(success => {
        console.log('Η εντολή για αλλαγή σελίδας έτρεξε. Πέτυχε;', success); // 👈 Log #5
      });

    } else {
      console.error('ΣΦΑΛΜΑ: Το this.task είναι undefined! Η διαγραφή ακυρώθηκε.'); // 👈 Log #6
    }
    }



}
