import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation, forwardRef } from '@angular/core'
import { PrizmRadioButtonComponent } from '@prizm-ui/components'
import { NG_VALUE_ACCESSOR, ReactiveFormsModule, UntypedFormControl } from '@angular/forms'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-custom-radio',
  template: `
    <div class="custom-container">
      <prizm-radio-button
        [formControl]="formControl"
        [label]="label"
        [value]="value"
        [size]="size"
        [name]="name"
        (changeEvent)="onChange(value)"
      ></prizm-radio-button>
    </div>
  `,
  styleUrls: ['./custom-radio.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, ReactiveFormsModule, PrizmRadioButtonComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomRadioComponent),
      multi: true,
    },
  ],
  standalone: true,
})
export class CustomRadioComponent {
  @Input() formControl!: UntypedFormControl
  @Input() label!: string
  @Input() value!: string
  @Input() size: 's' | 'm' | 'l' = 'm'
  @Input() name!: string

  handleChange(value: any): void {
    this.onChange(value)
    this.onTouched()
  }

  onChange: (value: any) => void = () => {}
  onTouched: () => void = () => {}

  writeValue(value: any): void {
    if (value !== this.formControl.value) {
      this.formControl.setValue(value, { emitEvent: false })
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }
}
