import { inject, Injectable, signal } from '@angular/core';
import { Pagination, SnackMutationData } from '@interfaces/index';
import { HttpService } from './http.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackService {
  sendAlert = signal<{ type: 'success' | 'error', msg: string }>({
    type: 'success',
    msg: ''
  })

  private apiService = inject(HttpService)

  page(payload: Pagination) {
    return this.apiService.page(payload);
  }

  optimalElements(minCalories: number, maxWeight: number) {
    return this.apiService.optimalElements(minCalories, maxWeight);
  }

  getSnack(id: number) {
    return this.apiService.getSnack(id);
  }

  createSnack(payload: SnackMutationData) {
    return this.apiService.createSnack(payload).pipe(map((r) => {
      this.sendAlert.set({
        type: r.error ? 'error' : 'success',
        msg: r.msg
      });
      return r
    }));
  }

  updateSnack(id: number, payload: SnackMutationData) {
    return this.apiService.updateSnack(id, payload).pipe(map((r) => {
      this.sendAlert.set({
        type: r.error ? 'error' : 'success',
        msg: r.msg
      });
      return r
    }));
  }

  deleteSnack(id: number) {
    return this.apiService.deleteSnack(id).pipe(map((r) => {
      this.sendAlert.set({
        type: r.error ? 'error' : 'success',
        msg: r.msg
      });
      return r
    }));
  }

}
