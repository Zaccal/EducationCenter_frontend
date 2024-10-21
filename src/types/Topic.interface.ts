import { ILesson } from './Lesson.interfaces'

export interface ITopic {
    id: number
    createdAt: Date
    updatedAt: Date
    title: string
    lessons: ILesson[]
}

export interface ITopicResponse {
    data: ITopic[]
}
