import { Injectable, ElementRef } from '@angular/core'
import { PrizmThemeService } from '@prizm-ui/theme'

@Injectable({ providedIn: 'root' })
export class ThemeService {
  constructor(private readonly theme: PrizmThemeService) {}

  public toggleTheme(isDark: boolean): void {
    const newTheme = isDark ? 'dark' : 'light'
    this.theme.update(newTheme)
    console.log('Current theme:', newTheme)
  }

  public getCurrentTheme(): boolean {
    const currentTheme = this.theme.getByElement(this.theme.rootElement) as 'light' | 'dark'
    return currentTheme === 'dark'
  }

  public updateThemeForContainer(container: ElementRef, theme: 'light' | 'dark'): void {
    this.theme.update(theme, container.nativeElement)
  }
}
