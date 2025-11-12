import { inject, Injectable } from '@angular/core';
import { TodoApiService } from './todo-api.service';
import { CreateTodoRequest, FilterStatus, TodoData, UpdateTodoRequest } from '@todo-module/interfaces';
import { TodoPriority } from '@todo-module/enums';
import { TIME_DAY_MILLIS } from '@constants/index';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  #api = inject(TodoApiService)

  getAll(filter: FilterStatus) {
    return this.#api.all(filter)
  }

  create(title: string, description: string = '') {
    const payload: CreateTodoRequest = {
      title,
      description,
      priority: TodoPriority.Low,
      dueDate: new Date(Date.now() + TodoPriority.Low * TIME_DAY_MILLIS).toISOString()
    }
    return this.#api.create(payload)
  }

  update(id: number, data: TodoData) {
    const payload: UpdateTodoRequest = {
      ...data
    }
    return this.#api.update(id, payload)
  }

  delete(id: number) {
    return this.#api.delete(id)
  }

}
