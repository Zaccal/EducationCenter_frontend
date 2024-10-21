import { useSearchParams } from 'react-router-dom'

const useGetQuery = <T = string>(get: string, ifNot: T): T => {
    const [queryParams] = useSearchParams()

    return (queryParams.get(get) || ifNot) as T
}

export default useGetQuery
