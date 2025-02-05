import { Injectable, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../shared/config/environments'
import { v4 as uuidv4 } from 'uuid'
import { TaskRdo } from '../models/task.rdo'
import { TaskDdo } from '../models'

@Injectable({ providedIn: 'root' })
export class TaskService {
  tasks = signal<TaskRdo[]>([])
  isLoading = signal<boolean>(false)

  constructor(private readonly http: HttpClient) {}

  public index() {
    this.isLoading.set(true)

    this.http.get<TaskRdo[]>(`${environment.apiUrl}/todos`).subscribe({
      next: (tasks) => {
        this.tasks.set(tasks)
        this.isLoading.set(false)
      },
      error: (err) => {
        console.error('Ошибка загрузки задач:', err)
        this.isLoading.set(false)
      },
    })
  }

  public updateCompleted(id: string) {
    const task = this.tasks().find((task) => task.id === id)
    if (!task) return

    const updatedTask = { ...task, completed: !task.completed }

    this.http.patch<TaskRdo>(`${environment.apiUrl}/todos/${id}`, updatedTask).subscribe({
      next: (updated) => {
        const updatedTasks = this.tasks().map((task) => (task.id === id ? updated : task))
        this.tasks.set(updatedTasks)
      },
      error: (err) => console.error('Ошибка при обновлении задачи:', err),
    })
  }

  public delete(id: string) {
    this.http.delete(`${environment.apiUrl}/todos/${id}`).subscribe({
      next: () => {
        this.tasks.set(this.tasks().filter((task) => task.id !== id))
      },
      error: (err) => console.error('Ошибка при удалении задачи:', err),
    })
  }

  public create(title: string) {
    const newTask: TaskDdo = {
      id: uuidv4(),
      title,
      completed: false,
    }

    this.http.post<TaskRdo>(`${environment.apiUrl}/todos`, newTask).subscribe({
      next: (createdTask) => {
        this.tasks.set([...this.tasks(), createdTask])
      },
      error: (err) => console.error('Ошибка при добавлении задачи:', err),
    })
  }
}
