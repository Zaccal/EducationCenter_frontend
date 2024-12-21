import { ILesson } from '@/types/Lesson.interfaces'
import { ITopic } from '@/types/Topic.interface'
import { FileVideo, MessageCirclePlus, MessagesSquare } from 'lucide-react'

interface IVideoHeader {
    lesson?: ILesson
    topic?: ITopic
}

const VideoHeader = ({ lesson, topic }: IVideoHeader) => {
    return (
        <>
            <h2 className="text-[22px]">{topic?.title}</h2>
            <div className="mt-4 flex gap-4">
                <div className="flex items-center gap-2">
                    <FileVideo color="#2c48a5" />
                    <p>{topic?.lessons.length} урока</p>
                </div>

                <div className="flex items-center gap-2">
                    <MessagesSquare color="#2c48a5" />
                    <p>{lesson?.questions.length} вопросов</p>
                </div>

                <div className="flex items-center gap-2">
                    <MessageCirclePlus color="#2c48a5" />
                    <p>
                        {lesson?.questions.reduce((questionCount, question) => {
                            return (
                                questionCount +
                                (question.answers ? question.answers.length : 0)
                            )
                        }, 0)}{' '}
                        ответа
                    </p>
                </div>
            </div>
        </>
    )
}

export default VideoHeader
