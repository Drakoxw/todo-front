

interface ISnack {
  name: string;
  calories: number;
  weight: number;
}

export interface SnackData extends ISnack {
  id: number;
}

export interface SnackMutationData extends ISnack { }

export interface OptimalElements {
  items: SnackData[],
  totalCalories: number,
  totalWeight: number
}
