import { IGetLessonQuery } from '@/types/Lesson.interfaces'
import { Statistics } from '@/types/LessonStatistics.interfaces'
import api from '../Interceptor'

enum LessonRoute {
    lesson = '/lesson/',
    statistics = '/lesson/statistics/',
}

class LessonService {
    async getAll(query?: IGetLessonQuery) {
        return await api.get(LessonRoute.lesson, {
            params: query,
        })
    }

    async getLessonStatistics(videoId: string) {
        return await api.get<Statistics>(LessonRoute.statistics + videoId)
    }
}

export default new LessonService()
