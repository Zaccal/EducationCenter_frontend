import useGetProfile from '@/hook/useGetProfile'
import { IQuestion } from '@/types/Question.interface'
import dayjs from 'dayjs'
import { useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface IQuestionMessage {
    question: IQuestion
}

const QuestionMessage = ({ question }: IQuestionMessage) => {
    const { data, isLoading } = useGetProfile(question.userId)
    const [isOpenShowAnswer, setIsOpenAnswer] = useState(false)

    if (isLoading) return undefined

    console.log(question.userId)

    return (
        <div className="flex w-full items-start mb-6 gap-3.5">
            <Avatar>
                <AvatarImage src={data?.avatar} />
                <AvatarFallback>
                    {data?.firstName[0]}
                    {data?.firstName[1]}
                </AvatarFallback>
            </Avatar>
            <div className="w-full">
                <div className="flex items-start justify-between ">
                    <span className="text-sm font-bold">
                        @{data?.firstName} {data?.lastName}
                    </span>
                    <span className="text-sm">
                        {dayjs(question.createdAt).format('DD-MM-YYYY | HH:MM')}
                    </span>
                </div>
                <p className="">{question.comment}</p>
                {question.answers[0] && (
                    <Accordion type="single" collapsible>
                        <AccordionItem value={'Ответь'}>
                            <AccordionTrigger
                                onClick={() =>
                                    setIsOpenAnswer(!isOpenShowAnswer)
                                }
                            >
                                {isOpenShowAnswer ? 'Скрыть' : 'Просотреть'}{' '}
                                ответы
                            </AccordionTrigger>
                            <AccordionContent className="mt-2 mb-4">
                                {question.answers.map((answerData) => (
                                    <div
                                        key={answerData.id}
                                        className="flex items-start gap-3.5"
                                    >
                                        <Avatar>
                                            <AvatarImage
                                                src={answerData.user.avatar}
                                            />
                                            <AvatarFallback>
                                                {answerData.user.firstName[0] +
                                                    answerData.user.lastName[1]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="">
                                            <span className="text-sm font-bold">
                                                @{answerData.user?.firstName}{' '}
                                                {answerData.user?.lastName}
                                            </span>
                                            <p>{answerData.comment}</p>
                                        </div>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )}
            </div>
        </div>
    )
}

export default QuestionMessage
