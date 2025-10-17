import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import { URL_API_BASE } from '@constants/index';
import { httpErrorHandler } from '@shared/utils';
import { OptimalElements, PageData, PageResponse, Pagination, ResponseBase, SnackData, SnackMutationData } from '@interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private http = inject(HttpClient)

  page(payload: Pagination): Observable<{
    error: boolean;
    msg: string;
    data?: PageData<SnackData>;
  }> {
    const res = { error: true, msg: 'Error inesperado', data: undefined as PageData<SnackData> | undefined };
    return this.http.post<PageResponse<SnackData>>(`${URL_API_BASE}/api/snacks/page`, payload).pipe(
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


  optimalElements(minCalories: number, maxWeight: number): Observable<{
    error: boolean;
    msg: string;
    data?: OptimalElements;
  }> {
    const res = { error: true, msg: 'Error inesperado', data: undefined as OptimalElements | undefined };
    return this.http.get<ResponseBase<OptimalElements>>(
      `${URL_API_BASE}/api/snacks/best-combination?minCalories=${minCalories}&maxWeight=${maxWeight}`
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

  getSnack(id: number): Observable<{
    error: boolean;
    msg: string;
    data?: SnackMutationData;
  }> {
    const res = { error: true, msg: 'Error inesperado', data: undefined as SnackMutationData | undefined };
    return this.http.get<ResponseBase<SnackMutationData>>(
      `${URL_API_BASE}/api/snacks/${id}`
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

  createSnack(payload: SnackMutationData): Observable<{
    error: boolean;
    msg: string;
    data?: SnackMutationData;
  }> {
    const res = { error: true, msg: 'Error inesperado', data: undefined as SnackMutationData | undefined };
    return this.http.post<ResponseBase<SnackMutationData>>(
      `${URL_API_BASE}/api/snacks`, payload
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

  updateSnack(id: number, payload: SnackMutationData): Observable<{
    error: boolean;
    msg: string;
    data?: SnackMutationData;
  }> {
    const res = { error: true, msg: 'Error inesperado', data: undefined as SnackMutationData | undefined };
    return this.http.put<ResponseBase<SnackMutationData>>(
      `${URL_API_BASE}/api/snacks/${id}`, payload
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

  deleteSnack(id: number): Observable<{
    error: boolean;
    msg: string;
  }> {
    const res = { error: true, msg: 'Error inesperado'};
    return this.http.delete<ResponseBase<SnackMutationData>>(
      `${URL_API_BASE}/api/snacks/${id}`,
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
