import { NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OptimalElements } from '@interfaces/index';
import { SnackService } from '@services/index';
import { FormControlErrorPipe } from '@shared/pipes';
import { ButtonModule } from 'primeng/button';

import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';

const VOID: OptimalElements = { items: [], totalCalories: 0, totalWeight: 0 };

@Component({
  selector: 'app-optimal-elements',
  templateUrl: './optimal-elements.component.html',
  styleUrls: ['./optimal-elements.component.css'],
  imports: [
    NgTemplateOutlet,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    InputNumberModule,
    MessageModule,
    FormControlErrorPipe,
  ]
})
export class OptimalElementsComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  @Input() show: boolean = false;

  readonly #service = inject(SnackService);
  data = signal<OptimalElements>({ ...VOID });

  form: FormGroup;
  loading = false

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.form = this.fb.group({
      minCalories: [null, [Validators.required, Validators.min(0)]],
      maxWeight: [null, [Validators.required, Validators.min(0)]],
    });
  }

  calculateOptimalElements() {
    if (this.loading) return

    if (this.form.valid) {
      this.loading = true
      const minCalories = this.form.get('minCalories')?.value;
      const maxWeight = this.form.get('maxWeight')?.value;
      setTimeout(() => {
        this.#service.optimalElements(minCalories, maxWeight).subscribe((r) => {
          if (r.data) {
            this.data.set({ ...r.data })
          } else {
            this.data.set({ ...VOID })
          }
          this.loading = false
        });
      });
    }
  }

}
