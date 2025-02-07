import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header>
      <nav>
        <a routerLink="/home">Home</a>
        <a routerLink="/tasks">Todo List</a>
        <a [routerLink]="['/protected']" [queryParams]="{ access: 'secret' }">Protected</a>
      </nav>
    </header>
  `,
  styles: [
    `
      header {
        background: #333;
        padding: 1rem;
        color: white;
        text-align: center;
      }
      nav a {
        color: white;
        margin: 0 1rem;
        text-decoration: none;
      }
    `,
  ],
})
export class HeaderComponent {}
