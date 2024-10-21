import { IQuestion } from './Question.interface'

export enum EnumSort {
    DEFUALT = 'defualt',
    DATE_HIGHIEST = 'date_highiest',
    DATE_LOWIEST = 'date_lowiest',
    ALPHABETICAL_HIGHIEST = 'alphabetical_highiest',
    ALPHABETICAL_LOWIEST = 'alphabetical_lowiest',
}

export interface IPagination {
    page?: number
    perPage?: number
}

export interface IGetLessonQuery extends IPagination {
    sort?: EnumSort
    searchTerm?: string
}

export interface ILesson {
    id: number
    createdAt: Date
    updatedAt: Date
    url: string
    title: string
    description?: string
    userId: number
    questions: IQuestion[]
}

export interface ILessonCreate {
    url: string
    title: string
    description?: string
}

export type TypeLessonPatch = Partial<ILessonCreate>

export interface ILessonResponse {
    data: ILesson[]
}

export type TypeGetTopicQuery = IGetLessonQuery
