import LessonService from '@/api/services/Lesson.service'
import TopicService from '@/api/services/Topic.service'
import Container from '@/components/shared/Container'
import LessonCard from '@/components/shared/LessonCard'
import { PaginationDashboard } from '@/components/shared/PaginationDashboard'
import Search from '@/components/shared/Search'
import TopicCard from '@/components/shared/TopicCard'
import { Separator } from '@/components/ui/separator'
import useGetCount from '@/hook/useGetCount'
import useGetQuery from '@/hook/useGetQuery'
import { EnumContentShow } from '@/types/ContentShow.enum'
import { EnumCountGetObject } from '@/types/Count.enum'
import { IError } from '@/types/Error.interface'
import { EnumSort, ILesson, ILessonResponse } from '@/types/Lesson.interfaces'
import { ITopic, ITopicResponse } from '@/types/Topic.interface'
import { useQuery } from '@tanstack/react-query'
import { ArrowDown } from 'lucide-react'

const Dashboard = () => {
    const contentShow = useGetQuery<EnumContentShow>(
        'content',
        EnumContentShow.TOPICS
    )
    const sortTerm = useGetQuery<EnumSort>('sort', EnumSort.DEFUALT)
    const searchTerm = useGetQuery('search', '')

    const page = useGetQuery('page', '1')

    const {
        data: count,
        isLoading: countIsLoading,
        isError,
    } = useGetCount<EnumContentShow>(
        contentShow === EnumContentShow.TOPICS
            ? EnumCountGetObject.topic
            : EnumCountGetObject.lesson,
        contentShow
    )

    // TODO: Do hook for this
    const { data: contentData, isLoading } = useQuery<
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

    return (
        <>
            <Container>
                <Search />
                <div className="my-20">
                    <h1 className="text-3xl font-bold flex items-center gap-3 mb-7">
                        {contentShow}
                        <ArrowDown size={28} />
                    </h1>
                    <Separator className="mb-5" />
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {contentShow === EnumContentShow.TOPICS
                                ? (contentData as ITopic[]).map((data) => (
                                      <TopicCard key={data.id} {...data} />
                                  ))
                                : (contentData as ILesson[]).map((data) => (
                                      <LessonCard key={data.id} {...data} />
                                  ))}
                        </div>
                    )}
                    {!countIsLoading && !isError && (
                        <PaginationDashboard
                            className="w-fit mx-auto mt-14"
                            page={Number(page)}
                            pageSize={20}
                            totalCount={count as number}
                        />
                    )}
                </div>
            </Container>
        </>
    )
}

export default Dashboard
