import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../shared/config/environments'
import { v4 as uuidv4 } from 'uuid'
import { TaskRdo } from '../models/task.rdo'
import { TaskDto } from '../models'
import { BehaviorSubject, finalize, Observable, switchMap, tap } from 'rxjs'

// при providedIn: 'root' инъекция на уровне всего приложения сделано чтобы дополнительно не прописывать инъекцию в другие модули
// тем самым сервис доступен во всех модулях
@Injectable({ providedIn: 'root' })
export class TaskService {
  // вместо rxjs можно посмотреть ближе к Effector, NGXS или Akita
  private tasksSubject = new BehaviorSubject<TaskRdo[]>([])
  tasks$ = this.tasksSubject.asObservable()

  private taskSubject = new BehaviorSubject<TaskRdo | null>(null)
  task$ = this.taskSubject.asObservable()

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
    this.isLoadingSubject.next(true)

    const currentTasks = this.tasksSubject.getValue()

    const task = currentTasks.find((task) => task.id === id)
    if (!task) return new Observable()

    const updatedTask: TaskDto = { ...task, completed: !task.completed }

    return this.http.patch<TaskRdo>(`${environment.apiUrl}/todos/${id}`, updatedTask).pipe(
      tap((updated) => {
        const updatedTasks = currentTasks.map((task) => (task.id === id ? updated : task))
        this.tasksSubject.next(updatedTasks)
      }),
      finalize(() => this.isLoadingSubject.next(false)),
    )
  }

  public delete(id: string): Observable<void> {
    this.isLoadingSubject.next(true)

    return this.http.delete<void>(`${environment.apiUrl}/todos/${id}`).pipe(
      tap(() => {
        const updatedTasks = this.tasksSubject.getValue().filter((task) => task.id !== id)
        this.tasksSubject.next(updatedTasks)
      }),
      finalize(() => this.isLoadingSubject.next(false)),
    )
  }

  public create(title: string): Observable<TaskRdo> {
    this.isLoadingSubject.next(true)

    const newTask: TaskDto = {
      id: uuidv4(),
      title,
      completed: false,
    }

    return this.http.post<TaskRdo>(`${environment.apiUrl}/todos`, newTask).pipe(
      // switchMap(() => this.index()),
      // Повторно загружаем список задач после создания в возврате функции установить Observable<TaskRdo[]>
      tap((createdTask) => {
        this.tasksSubject.next([...this.tasksSubject.getValue(), createdTask])
      }),
      finalize(() => this.isLoadingSubject.next(false)),
    )
  }

  public show(id: string): Observable<TaskRdo> {
    this.isLoadingSubject.next(true)

    return this.http.get<TaskRdo>(`${environment.apiUrl}/todos/${id}`).pipe(
      tap((task) => this.taskSubject.next(task)),
      finalize(() => this.isLoadingSubject.next(false)),
    )
  }
}
