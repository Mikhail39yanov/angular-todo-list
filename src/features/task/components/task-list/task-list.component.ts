import { Component, OnInit, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TaskItemComponent } from '../task-item/task-item.component'
import { TaskService } from '../../services/task.service'
import { TaskFormComponent } from '../task-form/task-form.component'
import { Observable } from 'rxjs'
import { TaskRdo } from '../../models'
import { TaskContainerComponent } from '../task-container/task-container.component'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterModule, CommonModule, TaskItemComponent, TaskFormComponent, TaskContainerComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  tasks!: Observable<TaskRdo[]>
  isLoading!: Observable<boolean>

  constructor(private readonly taskService: TaskService) {}

  public ngOnInit() {
    this.taskService.index().subscribe()

    this.tasks = this.taskService.tasks$
    this.isLoading = this.taskService.isLoading$
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
}
