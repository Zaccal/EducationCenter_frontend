import LessonService from '@/api/services/Lesson.service'
import TopicService from '@/api/services/Topic.service'
import { EnumContentShow } from '@/types/ContentShow.enum'
import { IError } from '@/types/Error.interface'
import { EnumSort, ILesson, ILessonResponse } from '@/types/Lesson.interfaces'
import { ITopic, ITopicResponse } from '@/types/Topic.interface'
import { useQuery } from '@tanstack/react-query'
import useGetQuery from './useGetQuery'

const useGetContentQuery = () => {
    const contentShow = useGetQuery<EnumContentShow>(
        'content',
        EnumContentShow.TOPICS
    )
    const sortTerm = useGetQuery<EnumSort>('sort', EnumSort.DEFUALT)
    const searchTerm = useGetQuery('search', '')

    const page = useGetQuery('page', '1')

    const {
        data: contentData,
        isLoading,
        error,
        isError,
        ...ref
    } = useQuery<
        ITopicResponse | ILessonResponse,
        IError,
        ITopic[] | ILesson[]
    >({
        queryKey: ['topics', contentShow, searchTerm, sortTerm, page],
        queryFn: async () => {
            if (contentShow === EnumContentShow.TOPICS) {
                return await TopicService.getTopics({
                    searchTerm,
                    sort: sortTerm,
                    page: Number(page),
                    perPage: 20,
                })
            }
            return await LessonService.getAll({
                searchTerm,
                sort: sortTerm,
                page: Number(page),
                perPage: 20,
            })
        },
        select: ({ data }) => data,
    })

    return { contentData, isLoading, error, isError, ...ref }
}

export default useGetContentQuery
