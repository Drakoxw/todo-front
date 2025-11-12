import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from '@home-module/services';
import { ToastAlertService } from '@services/index';

import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [ChartModule, DecimalPipe]
})
export class DashboardComponent implements OnInit {

  readonly #service = inject(DashboardService)
  readonly #toastAlert = inject(ToastAlertService)
  constructor() { }

  ngOnInit(): void {
    this.#service.stats().subscribe({
      next: ({ data, error, msg}) => {
        if (error) {
          this.#toastAlert.errorAlert(msg);
          return
        }
        this.total.set(data.totalTodos)
        this.completed.set(data.completedTodos)
        this.pending.set(data.pendingTodos)
        this.percentage.set(data.completionPercentage)
      }
    })
  }

  total = signal<number>(0);
  completed = signal<number>(0);
  pending = signal<number>(0);

  percentage = signal<number>(0)

  chartData = computed(() => ({
    labels: ['Completadas', 'Pendientes'],
    datasets: [
      {
        data: [this.completed(), this.pending()],
        backgroundColor: ['#4ade80', '#f87171'], // verde y rojo
        hoverBackgroundColor: ['#22c55e', '#ef4444'],
      },
    ],
  }));

  chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#374151' },
      },
    },
  };

}
