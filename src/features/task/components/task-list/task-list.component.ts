import { Component, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TaskItemComponent } from '../task-item/task-item.component'

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  tasks = signal([
    { id: '1', title: 'Купить продукты', completed: false },
    { id: '2', title: 'Выгулять собаку', completed: true },
    { id: '3', title: 'Прочитать книгу', completed: false },
  ])

  toggleTaskCompleted(id: string) {
    this.tasks.set(this.tasks().map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }
}
