import { IQuestion } from '@/types/Question.interface'
import api from '../Interceptor'

export const enum EnumQustionsRoute {
    defualt = '/question/',
}

class Question {
    async create(lessonId: number, data: string) {
        await api.post<IQuestion>(EnumQustionsRoute.defualt + lessonId, {
            comment: data,
        })
    }
}

export default new Question()
