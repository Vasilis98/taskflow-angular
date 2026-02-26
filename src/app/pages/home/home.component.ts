// import {Component, OnDestroy, inject} from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { TaskCardComponent} from '../../task-card/task-card.component';
// import { TaskFormComponent} from '../../task-form/task-form.component';
// import {RouterLink} from '@angular/router';
// import {TaskService} from '../../services/task.service';
//
//
//
// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [CommonModule, FormsModule, TaskCardComponent, TaskFormComponent, RouterLink],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.css'
// })
// export class HomeComponent {
//   private taskService = inject(TaskService);
//
//
//   constructor() {
//     console.log('Home component created!!')
//   }
//
//   filterType: string = 'All';
//   editingTask: any = null;
//
//   handleTaskCreation(newTask: any) {
//     this.taskService.addTask(newTask);
//   }
//
//   removeTask(task: any) {
//     this.taskService.deleteTask(task.id);
//   }
//
//   openEditModal(task: any) {
//     this.editingTask = { ...task };
//   }
//
//   closeEditModal() {
//     this.editingTask = null;
//   }
//
//   saveTask() {
//     this.taskService.updateTask(this.editingTask);
//     this.closeEditModal();
//   }
// }

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TaskCardComponent } from '../../task-card/task-card.component'; // Τσέκαρε αν η διαδρομή είναι σωστή
import { TaskFormComponent } from '../../task-form/task-form.component'; // Τσέκαρε αν η διαδρομή είναι σωστή
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskCardComponent, TaskFormComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // 1. Φέρνουμε την "Αποθήκη" (Service)
  private taskService = inject(TaskService);

  // 2. Μεταβλητές για την κατάσταση της Οθόνης (View State)
  filterType: string = 'All'; // Τι επέλεξε ο χρήστης στο dropdown;
  editingTask: any = null;    // Ποιο task επεξεργαζόμαστε τώρα; (αν υπάρχει)

  // 3. GETTER: Ο "Διανομέας"
  // Αυτή η συνάρτηση τρέχει αυτόματα κάθε φορά που αλλάζει κάτι.
  get filteredTasks() {
    // Α. Πάρε όλα τα tasks από την αποθήκη
    const tasks = this.taskService.getAllTasks();

    // Β. Αν το φίλτρο είναι 'All', δώσ' τα όλα
    if (this.filterType === 'All') {
      return tasks;
    }

    // Γ. Αλλιώς, φιλτράρισε με βάση την προτεραιότητα
    return tasks.filter(task => task.priority === this.filterType);
  }

  // 4. Μέθοδοι Δράσης (Actions)

  // Όταν δημιουργείται νέο task από τη φόρμα
  handleTaskCreation(newTask: any) {
    this.taskService.addTask(newTask); // Στείλ' το στο Service να του δώσει ID και να το σώσει
  }

  // Όταν πατάμε διαγραφή στην κάρτα
  removeTask(task: any) {
    this.taskService.deleteTask(task.id); // Πες στο Service να το σβήσει
  }

  // Άνοιγμα Edit Modal
  openEditModal(task: any) {
    this.editingTask = { ...task }; // Αντιγραφή για να μην χαλάσουμε το original πριν πατήσουμε Save
  }

  // Κλείσιμο Edit Modal
  closeEditModal() {
    this.editingTask = null;
  }

  // Αποθήκευση αλλαγών (Update)
  saveTask() {
    this.taskService.updateTask(this.editingTask); // Στείλε τις αλλαγές στο Service
    this.closeEditModal();
  }
}
