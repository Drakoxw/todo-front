import { inject, Injectable } from '@angular/core';
import { DashboardApiService } from './dashboard-api.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  #api = inject(DashboardApiService)

  stats() {
    return this.#api.stats()
  }

}
