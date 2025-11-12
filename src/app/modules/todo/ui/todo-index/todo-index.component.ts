import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ConfirmationService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';

import { ToastAlertService } from '@services/toast-alert.service';
import { FilterStatus, TodoDataResponse } from '@todo-module/interfaces';
import { TodoService } from '@todo-module/services';
import { MOCK_TODO } from '@mocks/index';

@Component({
  selector: 'app-todo-index',
  templateUrl: './todo-index.component.html',
  styleUrls: ['./todo-index.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    AutoCompleteModule,
    TooltipModule,
    CheckboxModule,
    ConfirmDialogModule,
  ]
})
export default class TodoIndexComponent implements OnInit {

  readonly #toastAlert = inject(ToastAlertService)
  readonly #service = inject(TodoService)
  constructor(
    private confirm: ConfirmationService,
  ) { }

  filter = signal<FilterStatus>('all');
  showDialog = signal(false);
  loading = signal(false);
  editingTask = signal<TodoDataResponse>({ ...MOCK_TODO });
  todoData = signal<TodoDataResponse[]>([])

  ngOnInit(): void {
    this.getAllTodo()
  }

  private getAllTodo() {
    this.loading.set(true)
    this.#service.getAll(this.filter()).subscribe({
      next: ({ data }) => {
        this.todoData.set(data)
        this.loading.set(false)
      }
    })
  }

  openNew() {
    this.editingTask.set({ ...MOCK_TODO });
    this.showDialog.set(true);
  }

  editTask(item: TodoDataResponse) {
    this.editingTask.set(item);
    this.showDialog.set(true);
  }

  saveTask() {
    const { id, title } = this.editingTask();
    if (!title.trim()) return;

    this.showDialog.set(false);
    const request = id ? this.#service.update(id, { ...this.editingTask() }) : this.#service.create(title);
    request.subscribe({
      next: ({ error, msg }) => {
        if (error) {
          this.#toastAlert.errorAlert(msg);
          return;
        }
        this.#toastAlert.successAlert(msg, 'Ok');
        this.getAllTodo()
      }
    });
  }

  confirmDelete(task: any) {
    this.confirm.confirm({
      header: `Confirmar acción`,
      message: `¿Desea borrar "${task.title.trim().slice(0, 50)}"?`,
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancelar',
      acceptLabel: 'Confirmar',
      accept: () => {
        this.#service.delete(task.id).subscribe({
          next: ({ error, msg }) => {
            if (error) {
              this.#toastAlert.errorAlert(msg);
              return;
            }
            this.#toastAlert.successAlert(msg, 'Ok');
            this.getAllTodo()
          }
        });
      },
    });
  }

  toggleComplete(item: TodoDataResponse) {
    this.#service.update(item.id, { ...item }).subscribe({
      next: ({ error, msg }) => {
        if (error) {
          this.#toastAlert.errorAlert(msg);
          return;
        }
        this.#toastAlert.successAlert('Tarea actualizada', 'Ok');
        this.getAllTodo()
      }
    })
  }

  onFilterChange(filter: FilterStatus) {
    if (this.filter() === filter) return
    this.filter.set(filter);
    this.getAllTodo()
  }

}
