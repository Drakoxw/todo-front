import { inject, Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { LoginPayload, RegisterPayload } from '@auth-module/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly #api = inject(AuthApiService)

  login(payload: LoginPayload) {
    return this.#api.login(payload)
  }


  register(payload: RegisterPayload) {
    return this.#api.register(payload)
  }

}
