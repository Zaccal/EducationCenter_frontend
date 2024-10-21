import { ITopic } from '@/types/Topic.interface'
import dayjs from 'dayjs'
import { Presentation } from 'lucide-react'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card'

const TopicCard = ({
    createdAt,
    lessons,
    title,
}: Omit<ITopic, 'id' | 'updateAt'>) => {
    return (
        <Card className="sm:max-w-[324px] card-content">
            <CardHeader>
                <CardTitle className="text-[18px]">{title}</CardTitle>
                <CardDescription>
                    {dayjs(createdAt).format('DD-MM-YYYY')}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <p className="flex items-center gap-2 text-gray-600">
                    <Presentation size={17} />
                    {lessons.length}
                </p>
            </CardFooter>
        </Card>
    )
}

export default TopicCard
