import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms'
import { PrizmRadioButtonComponent } from '@prizm-ui/components'
import { CustomRadioSizeDirective } from './custom.directive'

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.less',
  imports: [CommonModule, ReactiveFormsModule, PrizmRadioButtonComponent, CustomRadioSizeDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class RadioButtonComponent {
  public size: 'm' | 'l' | 's' = 'l'
  public data: string[] = ['First property', 'Second property', 'Third property']
  public form = new UntypedFormControl({ value: this.data[1], disabled: false })
}
