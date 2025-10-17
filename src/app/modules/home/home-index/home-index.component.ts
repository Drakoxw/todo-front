import { Component, effect, inject, signal } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { CreateUpdateModalComponent, InformationComponent, OptimalElementsComponent, TableComponent } from '@home-module/components';
import { SnackService } from '@services/Snack.service';

import { PageData, Pagination } from '@interfaces/index';
import { SnackData } from '@interfaces/snack';

@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.css'],
  imports: [
    InformationComponent,
    TableComponent,
    ButtonModule,
    OptimalElementsComponent,
    CreateUpdateModalComponent,
    ToastModule,
    ConfirmDialogModule,
  ],
})
export default class HomeIndexComponent {
  table = signal<PageData<SnackData>>({
    items: [],
    totalItems: 0,
    page: 0,
    pageSize: 0
  });
  pagination: Pagination = {
    page: 1,
    pageSize: 3,
    search: ''
  }

  readonly #service = inject(SnackService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  showCalories = false
  showModal = false
  itemId: number | null = null

  constructor() {
    effect(() => {
      const alert =this.#service.sendAlert()
      this.messageService.add({
        severity: alert.type,
        summary: 'Alerta',
        detail: alert.msg
      })
    })
  }

  onTableChange(event: Pagination) {
    this.pagination = event
    this.#service.page(event).subscribe(r => {
      if (!r.error) {
        this.table.set(r.data);
      }
    });
  }

  reloadTable() {
    this.#service.page(this.pagination).subscribe(r => {
      if (!r.error) {
        this.table.set(r.data);
      }
    });
  }

  toggleModalCalories(value: boolean) {
    this.showCalories = value
  }

  toggleModal(value: boolean, id: number | null = null) {
    this.showModal = value
    this.itemId = id
  }

  onDeleteItem(ev: number) {
    this.confirmationService.confirm({
      message: '¿Desea borrar este elemento?',
      header: `Eliminar el Snack #${ev}`,
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancelar',
      acceptLabel: 'Confirmar',
      accept: () => {
        this.#service.deleteSnack(ev).subscribe(r => {
          if (!r.error) {
            this.reloadTable()
          }
        })
      },
    });

  }
}
