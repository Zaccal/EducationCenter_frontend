import TopicService from '@/api/services/Topic.service'
import Container from '@/components/shared/Container'
import LessonsList from '@/components/shared/LessonsList'
import QuestionMessage from '@/components/shared/QuestionMessage'
import VideoDescription from '@/components/shared/VideoDescription'
import VideoHeader from '@/components/shared/VideoHeader'
import VideoPlayer from '@/components/shared/VideoPlayer'
import VideoQuestionForm from '@/components/shared/VideoQuestionForm'
import { EnumCookie } from '@/types/Cookie.enum'
import { IError } from '@/types/Error.interface'
import { ITopic, ITopicResponseBy } from '@/types/Topic.interface'
import { TypeVideoParamsURL } from '@/types/VideoParamsUrl'
import { useQuery } from '@tanstack/react-query'
import CookieConsent from 'react-cookie-consent'
import { useParams } from 'react-router-dom'

const Video = () => {
    const { lessonId, topicId } = useParams<TypeVideoParamsURL>()

    // TODO: Do error catcher
    const { data, isLoading, isError, error } = useQuery<
        ITopicResponseBy,
        IError,
        ITopic
    >({
        queryKey: ['TopicId'],
        queryFn: async () => {
            return await TopicService.getTopicBy(topicId!)
        },
        select: ({ data }) => data,
    })

    // TODO: Create loadign UI
    if (isLoading && !data) return <>Loading...</>

    const currentLesson = data?.lessons.find(
        (data) => data.id === Number(lessonId)
    )

    return (
        <>
            <Container>
                <div className="mt-24">
                    <VideoHeader lesson={currentLesson} topic={data} />
                    <div className="grid  grid-cols-12 gap-8 items-start mt-12">
                        <VideoPlayer url={currentLesson?.url || ''} />
                        <LessonsList lessons={data!.lessons} />

                        <div className="col-span-8 px-4 py-4 border border-gray-500 rounded-lg bg-white ">
                            <VideoDescription
                                videoId={String(currentLesson?.id)}
                                currentLesson={currentLesson}
                            />
                            <VideoQuestionForm />
                            <div className="my-12 flex flex-col-reverse">
                                {currentLesson?.questions.map(
                                    (qustionsData) => (
                                        <QuestionMessage
                                            key={qustionsData.id}
                                            question={qustionsData}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <CookieConsent
                    location="bottom"
                    buttonText="Принимаю"
                    declineButtonText="Отклоняю"
                    cookieName={EnumCookie.YOUTUBE_COOKIE}
                    enableDeclineButton={true}
                    style={{ background: '#24346b' }}
                    expires={150}
                    flipButtons
                >
                    Для просмотра видео необходимы cookies
                </CookieConsent>
            </Container>
        </>
    )
}

export default Video
