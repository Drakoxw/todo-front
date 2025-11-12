import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { URL_API_BASE } from '@constants/index';
import { DashboardStats } from '@home-module/interfaces';
import { ResponseBase } from '@interfaces/index';
import { httpErrorHandler } from '@shared/utils';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {

  private readonly baseApiUrl = `${URL_API_BASE}/api/todos`;
  #http = inject(HttpClient)

  stats(): Observable<{
    error: boolean;
    msg: string;
    data?: DashboardStats;
  }> {
    const res = { error: true, msg: 'Error inesperado', data: undefined as DashboardStats | undefined };
    return this.#http.get<ResponseBase<DashboardStats>>(
      `${this.baseApiUrl}/stats`,
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
