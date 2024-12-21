import QuestionService from '@/api/services/Question.service'
import useAuth from '@/hook/useAuth'
import { useMutation } from '@tanstack/react-query'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Input } from '../ui/input'

const VideoQuestionForm = () => {
    const { data } = useAuth()
    const {
        mutateAsync,
        data: mutateData,
        error,
        isPending,
    } = useMutation({
        mutationKey: ['create-question'],
        mutationFn: async () => {
            return await QuestionService.create(2, 'Test question')
        },
    })

    return (
        <>
            <div className="flex gap-4 items-end">
                <Avatar>
                    <AvatarImage src={data?.avatar} />
                    <AvatarFallback>
                        {data?.firstName[0]}
                        {data?.lastName[1]}
                    </AvatarFallback>
                </Avatar>
                <form action="POST">
                    <Input
                        variant="goust"
                        className="w-full border-b border-black"
                        placeholder="Можете задать вопрос."
                    />
                </form>
            </div>
        </>
    )
}

export default VideoQuestionForm
