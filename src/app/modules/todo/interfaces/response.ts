import { PriorityValue } from "./common";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoData {
  title: string;
  description: string;
  priority: PriorityValue;
  dueDate: string;
  isCompleted: boolean;
}

export interface TodoDataResponse extends TodoData {
  id: number;
}
