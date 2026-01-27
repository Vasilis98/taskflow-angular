import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-task-card',
  imports: [
    NgClass
  ],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() date: string = '';
  @Input() priority: string = '';

  @Output() deleteTask = new EventEmitter<void>();

  onDeleteClick() {
    this.deleteTask.emit();
  }

}
