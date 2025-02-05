import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'tasks',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>{{ title }}</h1>
    <router-outlet></router-outlet>
  `,
})
export class TasksComponent {
  title = 'Tasks Page'
}
