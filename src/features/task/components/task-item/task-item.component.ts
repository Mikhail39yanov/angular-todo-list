import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TaskRdo } from '../../models'

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input() tag: string = 'li'
  @Input() task!: TaskRdo

  @Output() toggleCompleted = new EventEmitter<string>()
  @Output() deleteTask = new EventEmitter<string>()

  onToggle() {
    this.toggleCompleted.emit(this.task.id)
  }

  onDelete() {
    this.deleteTask.emit(this.task.id)
  }
}
