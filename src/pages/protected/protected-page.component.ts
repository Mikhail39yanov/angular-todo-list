import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-protected-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="protected">
      <h1>Доступ разрешен</h1>
      <p>Вы вошли в защищенную страницу!</p>
    </div>
  `,
  styles: [
    `
      .protected {
        text-align: center;
        padding: 2rem;
      }
    `,
  ],
})
export class ProtectedPageComponent {}
