import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../shared/config/environments'
import { v4 as uuidv4 } from 'uuid'
import { TaskRdo } from '../models/task.rdo'
import { TaskDdo } from '../models'
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksSubject = new BehaviorSubject<TaskRdo[]>([])
  tasks$ = this.tasksSubject.asObservable()

  private isLoadingSubject = new BehaviorSubject<boolean>(false)
  isLoading$ = this.isLoadingSubject.asObservable()

  constructor(private readonly http: HttpClient) {}

  public index(): Observable<TaskRdo[]> {
    this.isLoadingSubject.next(true)

    return this.http.get<TaskRdo[]>(`${environment.apiUrl}/todos`).pipe(
      tap((tasks) => this.tasksSubject.next(tasks)),
      finalize(() => this.isLoadingSubject.next(false)),
    )
  }

  public updateCompleted(id: string): Observable<TaskRdo> {
    const currentTasks = this.tasksSubject.getValue()

    const task = currentTasks.find((task) => task.id === id)
    if (!task) return new Observable()

    const updatedTask = { ...task, completed: !task.completed }

    return this.http.patch<TaskRdo>(`${environment.apiUrl}/todos/${id}`, updatedTask).pipe(
      tap((updated) => {
        const updatedTasks = currentTasks.map((task) => (task.id === id ? updated : task))
        this.tasksSubject.next(updatedTasks)
      }),
    )
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/todos/${id}`).pipe(
      tap(() => {
        const updatedTasks = this.tasksSubject.getValue().filter((task) => task.id !== id)
        this.tasksSubject.next(updatedTasks)
      }),
    )
  }

  public create(title: string): Observable<TaskRdo> {
    const newTask: TaskDdo = {
      id: uuidv4(),
      title,
      completed: false,
    }

    return this.http.post<TaskRdo>(`${environment.apiUrl}/todos`, newTask).pipe(
      tap((createdTask) => {
        this.tasksSubject.next([...this.tasksSubject.getValue(), createdTask])
      }),
    )
  }
}
