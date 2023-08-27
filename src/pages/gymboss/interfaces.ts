export interface IExercise {
  id: number,
  name: string
}

export interface IApproach {
  count: number,
  type: string,
  weight: number
}
export interface IExerciseTrain {
  exercise: number,
  result: Array<IApproach>
}
export interface ITrain {
  date: string
  train: Array<IExerciseTrain>
}
