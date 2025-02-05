import { Component, Output, EventEmitter, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {
  @Output() addTask = new EventEmitter<string>()

  taskForm!: FormGroup

  constructor(private fb: FormBuilder) {}

  public ngOnInit() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  public onSubmit() {
    if (this.taskForm.valid) {
      this.addTask.emit(this.taskForm.value.title!)
      this.taskForm.reset()
    }
  }
}
