export interface IExercise {
  id: number,
  name: string
}

interface IApproach {
  count: number,
  type: string,
  weight: number
}
interface IExerciseTrain {
  exercise: number,
  result: Array<IApproach>
}
export interface ITrain {
  date: string
  train: Array<IExerciseTrain>
}
