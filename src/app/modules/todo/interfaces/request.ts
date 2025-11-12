import { PriorityValue } from "./common";

export interface CreateTodoRequest {
  title: string;
  description: string;
  priority: PriorityValue;
  dueDate: string;
}

export interface UpdateTodoRequest {
  title: string;
  description: string;
  priority: PriorityValue;
  isCompleted: boolean;
  dueDate: string;
}
