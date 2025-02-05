import { Injectable, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from '../../../shared/config/environments'

export interface Task {
  id: string
  title: string
  completed: boolean
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  tasks = signal<Task[]>([])
  isLoading = signal<boolean>(false)

  constructor(private readonly http: HttpClient) {}

  fetchTasks(): void {
    this.isLoading.set(true)

    this.http.get<Task[]>(`${environment.apiUrl}/todos`).subscribe({
      next: (tasks) => {
        this.tasks.set(tasks)
        this.isLoading.set(false)
      },
      error: () => this.isLoading.set(false),
    })
  }

  toggleTaskCompleted(id: string): void {
    const updatedTasks = this.tasks().map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    this.tasks.set(updatedTasks)
  }

  deleteTask(id: string): void {
    this.tasks.set(this.tasks().filter((task) => task.id !== id))
  }
}
