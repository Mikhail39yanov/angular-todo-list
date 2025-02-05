import { Component, OnInit, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TaskItemComponent } from '../task-item/task-item.component'
import { TaskService } from '../../services/task.service'

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  tasks = computed(() => this.taskService.tasks())
  isLoading = computed(() => this.taskService.isLoading())

  constructor(private readonly taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.fetchTasks()
  }

  toggleTaskCompleted(id: string): void {
    this.taskService.toggleTaskCompleted(id)
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id)
  }
}
