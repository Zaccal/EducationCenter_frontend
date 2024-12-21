import { ITopic } from '@/types/Topic.interface'
import { truncateTextByWords } from '@/utils/TruncateText'
import dayjs from 'dayjs'
import { Presentation } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

const TopicCard = ({
    createdAt,
    lessons,
    title,
    id,
}: Omit<ITopic, 'updateAt'>) => {
    return (
        <Link to={`video/${id}/${lessons[0].id}`}>
            <Card className="sm:max-w-[324px] card-content">
                <CardHeader>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <CardTitle className="text-[16px]">
                                <CardTitle className="text-[18px]">
                                    {truncateTextByWords(title, 6)}
                                </CardTitle>
                            </CardTitle>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{truncateTextByWords(title, 18)}</p>
                        </TooltipContent>
                    </Tooltip>
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
        </Link>
    )
}

export default TopicCard
