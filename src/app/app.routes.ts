import { Routes } from '@angular/router'
import { HomeComponent } from '../pages/home/home.component'
import { TasksComponent } from '../pages/tasks/tasks.component'

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'tasks',
    component: TasksComponent,
    // Загрузка ленивых маршрутов или модулей
    loadChildren: () => import('../features/task/task.routes').then((m) => m.taskRoutes),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
]
