import { Routes } from '@angular/router'
import { HomeComponent } from '../pages/home/home.component'
import { TasksComponent } from '../pages/tasks/tasks.component'
import { TaskComponent } from '../pages/task/task.component'
import { ProtectedPageComponent } from '../pages/protected/protected-page.component'
import { AccessGuard } from '../shared/guards/access.guard'

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // Этот ProtectedPageComponent компонент будет доступен только при ?access=secret.
  { path: 'protected', component: ProtectedPageComponent, canActivate: [AccessGuard] },
  {
    path: 'tasks',
    component: TasksComponent,
    // Загрузка ленивых маршрутов или модулей
    loadChildren: () => import('../features/task/task.routes').then((m) => m.taskRoutes),
  },
  { path: 'tasks/:id', component: TaskComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
]
