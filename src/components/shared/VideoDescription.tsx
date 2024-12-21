import LessonService from '@/api/services/Lesson.service'
import { ILesson } from '@/types/Lesson.interfaces'
import { formatViewCount } from '@/utils/formatViewCount'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

interface IVideoDescription {
    currentLesson: ILesson | undefined
    videoId: string
}

const VideoDescription = ({ currentLesson, videoId }: IVideoDescription) => {
    const { data, error, isError, isLoading } = useQuery({
        queryKey: ['statistics'],
        queryFn: async () => {
            return await LessonService.getLessonStatistics(videoId)
        },
        select(data) {
            return data.data
        },
    })

    return (
        <>
            <h1 className="text-xl font-bold">{currentLesson?.title}</h1>
            <div className="mt-4">
                <div className="flex items-center gap-3">
                    <span>{formatViewCount(Number(data?.viewCount))}</span>
                    <span>
                        {dayjs(currentLesson?.createdAt).format('DD-MM-YYYY')}
                    </span>
                </div>
                <p className="mt-4 text-gray-500">
                    {currentLesson?.description || 'Нету описаания'}
                </p>
            </div>
            <h3 className="font-bold my-4 text-lg">
                {currentLesson?.questions.length} вопросов
            </h3>
        </>
    )
}

export default VideoDescription
