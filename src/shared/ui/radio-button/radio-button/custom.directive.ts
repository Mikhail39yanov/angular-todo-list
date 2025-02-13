import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core'

@Directive({
  selector: '[customRadioSize]',
})
export class CustomRadioSizeDirective implements OnChanges {
  @Input() customRadioSize: 's' | 'm' | 'l' = 'm'

  private observer: MutationObserver

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.observer = new MutationObserver(() => this.applySize())
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customRadioSize']) {
      this.observeChanges()
    }
  }

  private observeChanges(): void {
    this.observer.disconnect()
    this.observer.observe(this.el.nativeElement, {
      childList: true,
      subtree: true,
    })
    this.applySize()
  }

  private applySize(): void {
    const radioButton = this.el.nativeElement.querySelector('.radio-button')
    const radioMark = this.el.nativeElement.querySelector('.radio-button__mark')

    if (radioButton) {
      this.renderer.setStyle(radioButton, 'width', 'var(--radio-button-size)')
      this.renderer.setStyle(radioButton, 'height', 'var(--radio-button-size)')
    }

    if (radioMark) {
      this.renderer.setStyle(radioMark, 'width', 'var(--radio-mark-size)')
      this.renderer.setStyle(radioMark, 'height', 'var(--radio-mark-size)')
    }
  }

  ngOnDestroy(): void {
    this.observer.disconnect()
  }
}
