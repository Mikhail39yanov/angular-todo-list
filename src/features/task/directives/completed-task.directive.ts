import { Directive, ElementRef, Input, OnChanges } from '@angular/core'

@Directive({
  selector: '[appCompletedTask]', // Используем директиву в HTML как атрибут
  standalone: true,
})
export class CompletedTaskDirective implements OnChanges {
  @Input() appCompletedTask!: boolean

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.appCompletedTask) {
      this.el.nativeElement.style.textDecoration = 'line-through'
      this.el.nativeElement.style.color = 'red'
    } else {
      this.el.nativeElement.style.textDecoration = 'none'
      this.el.nativeElement.style.color = 'black'
    }
  }
}
