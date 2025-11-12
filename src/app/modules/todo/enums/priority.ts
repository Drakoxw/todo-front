export enum TodoPriority {
  Low = 1,
  Medium = 2,
  High = 3,
  Critical = 4
}

export type Priority = keyof typeof TodoPriority
export const PriorityList: Priority[] = Object.keys(TodoPriority) as Priority[]
