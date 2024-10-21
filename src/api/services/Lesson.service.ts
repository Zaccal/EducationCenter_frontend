import { IGetLessonQuery } from '@/types/Lesson.interfaces'
import api from '../Interceptor'

enum LessonRoute {
    lesson = '/lesson/',
}

class LessonService {
    async getAll(query?: IGetLessonQuery) {
        return await api.get(LessonRoute.lesson, {
            params: query,
        })
    }
}

export default new LessonService()
