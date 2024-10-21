import { Progress } from '@/components/ui/progress'

interface ILeading {
    percentage: number
}

const Loading = ({ percentage }: ILeading) => {
    return (
        <div className="mx-auto mt-96 max-w-[16%] w-full">
            <h3 className="text-center font-bold text-xl">Загрузка...</h3>
            <Progress value={percentage} className="w-full mt-3" />
        </div>
    )
}

export default Loading
