import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useGetQuery from '@/hook/useGetQuery'
import { EnumSort } from '@/types/Lesson.interfaces'
import { ChevronDown } from 'lucide-react'
import qs from 'qs'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface ISortState {
    value: EnumSort
    title: string
}

const sortTitles: { [key in EnumSort]: string } = {
    [EnumSort.DEFUALT]: 'по умолчанию',
    [EnumSort.DATE_HIGHIEST]: 'по дате, сначала новые',
    [EnumSort.DATE_LOWIEST]: 'по дате, сначала старые',
    [EnumSort.ALPHABETICAL_HIGHIEST]: 'по алфавиту, от А до Я',
    [EnumSort.ALPHABETICAL_LOWIEST]: 'по алфавиту, от Я до А',
}

const Sort = () => {
    const sortQueryValue = useGetQuery<EnumSort>('sort', EnumSort.DEFUALT)
    const [sort, setSort] = useState<ISortState>({
        title: sortTitles[sortQueryValue],
        value: sortQueryValue,
    })

    const nav = useNavigate()
    const location = useLocation()
    const handleValueChange = (value: string) => {
        setSort({
            value: value as EnumSort,
            title: sortTitles[value as EnumSort],
        })

        const currentQuery = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        })

        const query = { ...currentQuery, sort: value }

        const queryString = qs.stringify(query, { addQueryPrefix: true })

        nav(queryString)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={'link'}
                    className="flex items-center gap-1 font-semibold"
                >
                    {sort.title}
                    <ChevronDown size={20} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Сортировать по: </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                    value={sort.value}
                    onValueChange={handleValueChange}
                >
                    {Object.values(EnumSort).map((sortOption) => (
                        <DropdownMenuRadioItem
                            key={sortOption}
                            value={sortOption}
                        >
                            {sortTitles[sortOption]}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Sort
