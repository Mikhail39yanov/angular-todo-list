import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ThemeComponent } from '../../features/theme/theme.component'
import { RadioButtonComponent } from '../../shared/ui/radio-button/radio-button/radio-button.component'

@Component({
  selector: 'tasks',
  standalone: true,
  imports: [RouterOutlet, ThemeComponent, RadioButtonComponent],
  template: `
    <h1>{{ title }}</h1>
    <router-outlet></router-outlet>
    <theme-container />
    <app-radio-button />
  `,
})
export class TasksComponent {
  title = 'Tasks Page'
}
