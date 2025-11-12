import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

import { AuthResponse, LoginPayload, RegisterPayload, RegisterResponse } from '@auth-module/interfaces';
import { URL_API_BASE } from '@constants/index';
import { ResponseBase } from '@interfaces/index';
import { httpErrorHandler } from '@shared/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  #http = inject(HttpClient)

  login(payload: LoginPayload): Observable<{
    error: boolean;
    msg: string;
    data?: AuthResponse;
  }> {
    const res = { error: true, msg: 'Error inesperado', data: undefined as AuthResponse | undefined };
    return this.#http.post<ResponseBase<AuthResponse>>(
      `${URL_API_BASE}/api/auth/login`, payload
    ).pipe(
      map((r) => {
        res.msg = r.message;
        if (!r.success) {
          return res;
        }

        res.data = r.data;
        res.error = false;
        return res
      }),
      catchError(httpErrorHandler),
    );
  }

  register(payload: RegisterPayload): Observable<{
    error: boolean;
    msg: string;
    data?: RegisterResponse;
  }> {
    const res = { error: true, msg: 'Error inesperado', data: undefined as RegisterResponse | undefined };
    return this.#http.post<ResponseBase<RegisterResponse>>(
      `${URL_API_BASE}/api/auth/register`, payload
    ).pipe(
      map((r) => {
        res.msg = r.message;
        if (!r.success) {
          return res;
        }

        res.data = r.data;
        res.error = false;
        return res
      }),
      catchError(httpErrorHandler),
    );
  }
}
