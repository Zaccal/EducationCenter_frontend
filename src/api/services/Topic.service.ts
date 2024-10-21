import { TypeGetTopicQuery } from '@/types/Lesson.interfaces'
import api from '../Interceptor'

const enum EnumTopicRoute {
    topics = '/topic/',
}

class TopicService {
    async getTopics(query?: TypeGetTopicQuery) {
        return await api.get(EnumTopicRoute.topics, {
            params: query,
        })
    }
}

export default new TopicService()
