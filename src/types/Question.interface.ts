import { IAnswer } from './Answer.interface'

export interface IQuestion {
    id: number
    createdAt: Date
    updatedAt: Date
    userId: number
    lessonId: number
    comment: string
    answers: IAnswer[]
}
