import { ILesson } from '@/types/Lesson.interfaces'
import { truncateTextByWords } from '@/utils/TruncateText'
import dayjs from 'dayjs'
import { CircleCheck, MessageCircleQuestion } from 'lucide-react'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card'

type TypeLessonCard = Pick<ILesson, 'createdAt' | 'title' | 'questions' | 'id'>

const LessonCard = ({ questions, createdAt, title, id }: TypeLessonCard) => {
    return (
        <Card className="shadow-md card-content mb-6">
            <CardHeader>
                <CardTitle className="text-[16px]">
                    {truncateTextByWords(title, 6)}
                </CardTitle>
                <CardDescription>
                    {dayjs(createdAt).format('DD.MM.YYYY')}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <p className="flex items-center gap-2 text-gray-600">
                    <MessageCircleQuestion size={17} />
                    {questions.length}
                </p>

                <p className="ml-3 flex items-center gap-2 text-gray-600">
                    <CircleCheck size={17} />
                    {questions.reduce((total, question) => {
                        return total + question.answers.length
                    }, 0)}
                </p>
            </CardFooter>
        </Card>
    )
}

export default LessonCard
