import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { TaskService } from '../../features/task/services/task.service'
import { Observable } from 'rxjs'
import { TaskRdo } from '../../features/task/models'

@Component({
  selector: 'tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {
  title = 'Detail Task Page'
  taskId: string | null = null

  task$!: Observable<TaskRdo | null>
  isLoading$!: Observable<boolean>

  constructor(private route: ActivatedRoute, private taskService: TaskService) {
    this.taskId = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id')

    if (taskId) {
      this.taskService.show(taskId).subscribe()
    }

    this.task$ = this.taskService.task$
    this.isLoading$ = this.taskService.isLoading$
  }
}
