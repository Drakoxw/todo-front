import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { InputText } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { AuthService } from '@auth-module/services';
import { ToastAlertService } from '@services/toast-alert.service';

import { FormControlErrorPipe } from '@shared/pipes';
import { parseJwt } from '@shared/utils';
import { UserStore } from '@store/index';
import { Router, RouterLink } from '@angular/router';
import { PATH } from '@constants/index';

@Component({
  selector: 'app-auth-index',
  templateUrl: './auth-index.component.html',
  imports: [ToastModule, ReactiveFormsModule, CardModule, InputText, FormControlErrorPipe, PasswordModule, RouterLink]
})
export default class AuthIndexComponent implements OnInit {
  loading = signal<boolean>(false);
  form: FormGroup;

  readonly #toastAlert = inject(ToastAlertService)
  readonly #store = inject(UserStore);
  #router = inject(Router);

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    if (this.#store.isLoggedIn()) {
      this.#router.navigate([PATH.HOME]);
    }
    this.loadForm();
  }

  private loadForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const { email, password } = this.form.value;

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
