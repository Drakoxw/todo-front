import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { InputText } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

import { AuthService } from '@auth-module/services';
import { ToastAlertService } from '@services/toast-alert.service';

import { FormControlErrorPipe } from '@shared/pipes';
import { parseJwt } from '@shared/utils';
import { UserStore } from '@store/index';
import { Router, RouterLink } from '@angular/router';
import { PATH } from '@constants/index';
import { passwordMatchValidator } from '@auth-module/validators';


@Component({
  selector: 'app-register-index',
  templateUrl: './register-index.component.html',
  imports: [
    ToastModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputText,
    FormControlErrorPipe,
    PasswordModule,
    RouterLink
  ]
})
export default class RegisterIndexComponent implements OnInit {
  loading = signal<boolean>(false);
  form: FormGroup;

  readonly #toastAlert = inject(ToastAlertService)
  readonly #store = inject(UserStore);
  #router = inject(Router);

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.loadForm();
  }

  private loadForm() {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, {
      validators: passwordMatchValidator
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const { email, password, fullName } = this.form.value;

    this.auth.register({ email, password, fullName }).subscribe({
      next: (r) => {
        this.loading.set(false);
        if (r.error) {
          this.#toastAlert.errorAlert(r.msg);
          return;
        }

        this.onLogin(email, password);
      }
    });
  }

  private onLogin(email: string, password: string) {
    this.auth.login({ email, password }).subscribe({
      next: (r) => {
        this.loading.set(false);
        if (r.error) {
          this.#toastAlert.errorAlert(r.msg);
          return;
        }

        const tokenData = parseJwt(r.data.token);
        this.#store.login(tokenData, r.data.token);
        this.#toastAlert.successAlert(`Bienvenido ${tokenData.name}`, 'Ok');
        this.#router.navigate([PATH.HOME]);
      }
    });
  }

}
