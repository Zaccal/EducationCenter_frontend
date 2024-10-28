import Container from '@/components/shared/Container'
import LessonCard from '@/components/shared/LessonCard'
import { PaginationDashboard } from '@/components/shared/PaginationDashboard'
import Search from '@/components/shared/Search'
import TopicCard from '@/components/shared/TopicCard'
import { Separator } from '@/components/ui/separator'
import useGetContentQuery from '@/hook/useGetContentQuery'
import useGetCount from '@/hook/useGetCount'
import useGetQuery from '@/hook/useGetQuery'
import { EnumContentShow } from '@/types/ContentShow.enum'
import { EnumCountGetObject } from '@/types/Count.enum'
import { ILesson } from '@/types/Lesson.interfaces'
import { ITopic } from '@/types/Topic.interface'
import 'ldrs/tailspin'
import { ArrowDown } from 'lucide-react'

const Dashboard = () => {
    const contentShow = useGetQuery<EnumContentShow>(
        'content',
        EnumContentShow.TOPICS
    )
    const page = useGetQuery('page', '1')

    const {
        data: count,
        isLoading: countIsLoading,
        isError: countIsError,
    } = useGetCount<EnumContentShow>(
        contentShow === EnumContentShow.TOPICS
            ? EnumCountGetObject.topic
            : EnumCountGetObject.lesson,
        contentShow
    )

    const { contentData, isLoading, error, isError } = useGetContentQuery()

    return (
        <>
            <Container>
                <Search />
                <div className="my-20">
                    <h1 className="text-3xl font-bold flex items-center gap-3 mb-7">
                        {contentShow === EnumContentShow.TOPICS
                            ? 'Темы'
                            : 'Уроки'}
                        <ArrowDown size={28} />
                    </h1>
                    <Separator className="mb-5" />
                    {isLoading ? (
                        <div className="mx-auto w-fit my-[20%]">
                            <l-tailspin></l-tailspin>
                        </div>
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
                    {!countIsLoading && !countIsError && (
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
