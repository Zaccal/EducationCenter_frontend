import { EnumContentShow } from '@/types/ContentShow.enum'
import { ChevronDown } from 'lucide-react'
import qs from 'qs'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const ContentSelect = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const [currentContent, setCurrentContent] = useState<EnumContentShow>(
        (queryParams.get('content') as EnumContentShow) ||
            EnumContentShow.TOPICS
    )

    const nav = useNavigate()
    const handleChangeValue = (value: string) => {
        setCurrentContent(value as EnumContentShow)

        const currentQuery = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        })

        const query = { ...currentQuery, content: value }

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
                    {currentContent}
                    <ChevronDown size={20} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Показать: </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                    value={currentContent}
                    onValueChange={handleChangeValue}
                >
                    {Object.values(EnumContentShow).map((value) => (
                        <DropdownMenuRadioItem key={value} value={value}>
                            {value}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ContentSelect
