import useGetQuery from '@/hook/useGetQuery'
import { useDebounceEffect } from 'ahooks'
import { SearchIcon } from 'lucide-react'
import qs from 'qs'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import ContentSelect from './ContentSelect'
import Sort from './Sort'

const Search = () => {
    const nav = useNavigate()
    const searchTermQuery = useGetQuery('search', '')
    const [searchTerm, setSearchTerm] = useState(searchTermQuery)
    const handleSearchChange = () => {
        const currentQuery = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        })

        const query = { ...currentQuery, search: searchTerm }

        const queryString = qs.stringify(query, { addQueryPrefix: true })

        nav(queryString)
    }

    useDebounceEffect(
        () => {
            if (searchTerm === '') handleSearchChange()
        },
        [searchTerm],
        {
            wait: 380,
        }
    )

    return (
        <div className="sm:flex-row flex-col flex gap-[10px] mx-auto max-w-4xl bg-secondary py-[14px] px-4 mt-8 rounded-md">
            <Input
                Icon={SearchIcon}
                className="placeholder:text-lg w-full"
                placeholder="Что ищите ?"
                onKeyUp={(event) => {
                    if (event.key === 'Enter') {
                        handleSearchChange()
                    }
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
            />
            <Sort />
            <ContentSelect />
            <Button
                onClick={handleSearchChange}
                className="font-semibold"
                variant={'success'}
            >
                Искать
            </Button>
        </div>
    )
}

export default Search
