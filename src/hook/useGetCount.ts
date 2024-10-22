import CountService from '@/api/services/Count.service'
import { EnumCountGetObject } from '@/types/Count.enum'
import { IError } from '@/types/Error.interface'
import { useQuery } from '@tanstack/react-query'

const useGetCount = <T = unknown>(object: EnumCountGetObject, key?: T) => {
    return useQuery<number, IError, number>({
        queryKey: ['count', key],
        queryFn: async () => {
            return await CountService.count(object)
        },
    })
}

export default useGetCount
