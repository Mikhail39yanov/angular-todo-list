import { Injectable, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from '../../../shared/config/environments'
import { v4 as uuidv4 } from 'uuid'

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

  public fetchTasks() {
    this.isLoading.set(true)

    this.http.get<Task[]>(`${environment.apiUrl}/todos`).subscribe({
      next: (tasks) => {
        this.tasks.set(tasks)
        this.isLoading.set(false)
      },
      error: () => this.isLoading.set(false),
    })
  }

  public toggleTaskCompleted(id: string) {
    const updatedTasks = this.tasks().map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    this.tasks.set(updatedTasks)
  }

  public deleteTask(id: string) {
    this.tasks.set(this.tasks().filter((task) => task.id !== id))
  }

  public addTask(title: string) {
    const newTask: Task = {
      id: uuidv4(),
      title,
      completed: false,
    }
    this.tasks.set([...this.tasks(), newTask])
  }
}
