import { Component, ElementRef, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PrizmToggleComponent } from '@prizm-ui/components'
import { FormsModule } from '@angular/forms'
import { ThemeService } from './theme.service'

@Component({
  selector: 'theme-container',
  standalone: true,
  imports: [CommonModule, PrizmToggleComponent, FormsModule],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss',
})
export class ThemeComponent {
  @ViewChild('themeContainer', { static: true, read: ElementRef }) el!: ElementRef
  public value = false
  public themeName = 'Светлая'

  constructor(private themeService: ThemeService) {
    this.value = this.themeService.getCurrentTheme()
    this.updateThemeName()
  }

  public onToggleChange(): void {
    this.themeService.toggleTheme(this.value)
    this.updateThemeName()
  }

  private updateThemeName(): void {
    this.themeName = this.value ? 'Темная' : 'Светлая'
  }
}
