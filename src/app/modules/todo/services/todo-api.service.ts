import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { URL_API_BASE } from '@constants/index';
import { ResponseBase } from '@interfaces/index';
import { httpErrorHandler } from '@shared/utils';
import { CreateTodoRequest, FilterStatus, TodoDataResponse, UpdateTodoRequest } from '@todo-module/interfaces';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  private readonly baseApiUrl = `${URL_API_BASE}/api/todos`;
  #http = inject(HttpClient)

  all(filter: FilterStatus): Observable<{
    error: boolean;
    msg: string;
    data?: TodoDataResponse[];
  }> {
    const urlFilter = filter === 'all' ? '' : `/${filter}`
    const res = { error: true, msg: 'Error inesperado', data: undefined as TodoDataResponse[] | undefined };
    return this.#http.get<ResponseBase<TodoDataResponse[]>>(
      `${this.baseApiUrl}${urlFilter}`,
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

  create(payload: CreateTodoRequest): Observable<{
    error: boolean;
    msg: string;
    data?: TodoDataResponse;
  }> {
    const res = { error: true, msg: 'Error inesperado', data: undefined as TodoDataResponse | undefined };
    return this.#http.post<ResponseBase<TodoDataResponse>>(
      `${this.baseApiUrl}`, payload
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

  update(id: number, payload: UpdateTodoRequest): Observable<{
    error: boolean;
    msg: string;
    data?: TodoDataResponse;
  }> {
    const res = { error: true, msg: 'Error inesperado', data: undefined as TodoDataResponse | undefined };
    return this.#http.put<ResponseBase<TodoDataResponse>>(
      `${this.baseApiUrl}/${id}`, payload
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

  delete(id: number): Observable<{
    error: boolean;
    msg: string;
    data?: unknown;
  }> {
    const res = { error: true, msg: 'Error inesperado', data: null as unknown };
    return this.#http.delete<ResponseBase<null>>(
      `${this.baseApiUrl}/${id}`
    ).pipe(
      map((r) => {
        res.msg = r.message;
        if (!r.success) {
          return res;
        }

        res.error = false;
        return res
      }),
      catchError(httpErrorHandler),
    );
  }
}
