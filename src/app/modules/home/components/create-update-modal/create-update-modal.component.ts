import { NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SnackMutationData } from '@interfaces/index';
import { SnackService } from '@services/index';
import { FormControlErrorPipe } from '@shared/pipes';
import { ButtonModule } from 'primeng/button';

import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-create-update-modal',
  templateUrl: './create-update-modal.component.html',
  styleUrls: ['./create-update-modal.component.css'],
  imports: [
    NgTemplateOutlet,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    MessageModule,
    FormControlErrorPipe,
  ]
})
export class CreateUpdateModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  @Output() savedData = new EventEmitter();
  @Input() show: boolean = false;
  @Input() id: number | null = null;

  readonly #service = inject(SnackService);

  form: FormGroup;
  loading = false

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm()
    this.loadForm()
  }

  initForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      weight: [null, [Validators.required, Validators.min(0)]],
      calories: [null, [Validators.required, Validators.min(0)]],
    });
  }

  loadForm() {
    if (this.id) {
      this.#service.getSnack(this.id).subscribe((res) => {
        if (res.data) {
          this.form.patchValue({
            name: res.data.name,
            weight: res.data.weight,
            calories: res.data.calories,
          })
        }
      })
    }
  }

  saveForm() {
    if (this.loading) return

    if (this.form.valid) {
      this.loading = true
      const name = this.form.get('name')?.value;
      const weight = this.form.get('weight')?.value;
      const calories = this.form.get('calories')?.value;

      const payload: SnackMutationData = {
        name,
        weight,
        calories
      }

      const request = this.id ? this.#service.updateSnack(this.id, payload) : this.#service.createSnack(payload)

      request.subscribe({
        next: (res) => {
          this.loading = false
          if (!res.error) {
            this.closeModal.emit()
            this.savedData.emit()
          }
        },
        error: (err) => {
          this.loading = false
          console.log(err)
        }
      })

    }
  }

}
