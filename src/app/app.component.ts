import { Component } from '@angular/core'
import { RouterModule, RouterOutlet } from '@angular/router'
import { HeaderComponent } from '../widgets/header/header.component'
import { FooterComponent } from '../widgets/footer/footer.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
