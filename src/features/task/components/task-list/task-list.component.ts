import { Component, OnInit, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TaskItemComponent } from '../task-item/task-item.component'
import { TaskService } from '../../services/task.service'
import { TaskFormComponent } from '../task-form/task-form.component'

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  tasks = computed(() => this.taskService.tasks())
  isLoading = computed(() => this.taskService.isLoading())

  constructor(private readonly taskService: TaskService) {}

  public ngOnInit() {
    this.taskService.fetchTasks()
  }

  public toggleTaskCompleted(id: string) {
    this.taskService.toggleTaskCompleted(id)
  }

  public deleteTask(id: string) {
    this.taskService.deleteTask(id)
  }

  public addTask(title: string) {
    this.taskService.addTask(title)
  }
}
