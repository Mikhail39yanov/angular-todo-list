import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ThemeComponent } from '../../features/theme/theme.component'

@Component({
  selector: 'tasks',
  standalone: true,
  imports: [RouterOutlet, ThemeComponent],
  template: `
    <h1>{{ title }}</h1>
    <theme-container />
    <router-outlet></router-outlet>
  `,
})
export class TasksComponent {
  title = 'Tasks Page'
}
