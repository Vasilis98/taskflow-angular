import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-task-card',
  imports: [
    NgClass
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() date: string | Date = '';
  @Input() priority: string = '';

  @Input() task: any;
  @Output() editTask = new EventEmitter<void>();

  @Output() deleteTask = new EventEmitter<void>();

  onDeleteClick() {
    this.deleteTask.emit();
  }

  onEdit() {
    this.editTask.emit();
  }

}
