import { Component, OnInit, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TaskItemComponent } from '../task-item/task-item.component'
import { TaskService } from '../../services/task.service'
import { TaskFormComponent } from '../task-form/task-form.component'
import { TaskRdo } from '../../models'

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  constructor(private readonly taskService: TaskService) {}

  get tasks() {
    return this.taskService.tasks$
  }

  get isLoading() {
    return this.taskService.isLoading$
  }

  public ngOnInit() {
    this.taskService.index().subscribe()
  }

  public toggleTaskCompleted(id: string) {
    this.taskService.updateCompleted(id).subscribe()
  }

  public deleteTask(id: string) {
    this.taskService.delete(id).subscribe()
  }

  public addTask(title: string) {
    this.taskService.create(title).subscribe()
  }

  public trackByTaskId(index: number, task: TaskRdo) {
    return task.id
  }
}
