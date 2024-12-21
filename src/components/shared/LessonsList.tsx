import { cn } from '@/lib/utils'
import { ILesson } from '@/types/Lesson.interfaces'
import { TypeVideoParamsURL } from '@/types/VideoParamsUrl'
import { truncateTextByWords } from '@/utils/TruncateText'
import { useNavigate, useParams } from 'react-router-dom'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../ui/accordion'
import { Button } from '../ui/button'

interface ILessonsList {
    lessons: ILesson[]
}

const LessonsList = ({ lessons }: ILessonsList) => {
    const navigate = useNavigate()
    const { topicId, lessonId } = useParams<TypeVideoParamsURL>()

    const handleChangeLesson = (newLessonId: number) => {
        navigate(`/video/${topicId}/${newLessonId}`)
    }

    return (
        <div className="bg-white w-full h-full max-h-[460px] overflow-y-auto col-start-9 col-end-13  py-7 border rounded-lg">
            <p className="font-bold text-lg ml-4 mb-4">Уроки: </p>
            <Accordion type="single" collapsible className="w-full">
                {lessons.map((data) => (
                    <AccordionItem
                        className={cn(
                            lessonId === String(data.id) &&
                                'bg-primary text-white',
                            'px-4'
                        )}
                        key={data.id}
                        value={data.title}
                    >
                        <AccordionTrigger>
                            {truncateTextByWords(data.title, 5)}
                        </AccordionTrigger>
                        {lessonId !== String(data.id) && (
                            <AccordionContent>
                                {data.description ? (
                                    <p className="text-gray-500">
                                        {truncateTextByWords(
                                            data.description,
                                            30
                                        )}
                                    </p>
                                ) : (
                                    <p className="text-center">Нету описания</p>
                                )}
                                <Button
                                    variant={'link'}
                                    onClick={() => handleChangeLesson(data.id)}
                                    className="mx-auto block"
                                >
                                    Смотреть
                                </Button>
                            </AccordionContent>
                        )}
                    </AccordionItem>
                ))}
            </Accordion>
            <p className="text-center text-gray-500 mt-[25%]">
                Пока больше видео нет...
            </p>
        </div>
    )
}

export default LessonsList
