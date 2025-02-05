import { Component, signal } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './components/task-list.component.html',
  styleUrl: './components/task-list.component.scss',
})
export class TaskListComponent {
  tasks = signal([{ title: 'Buy milk' }, { title: 'Learn Angular' }])
}
