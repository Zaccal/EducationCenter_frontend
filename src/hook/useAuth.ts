import UserService from '@/api/services/User.service'
import { IError } from '@/types/Error.interface'
import { IUserProfile } from '@/types/User.interface'
import { useQuery } from '@tanstack/react-query'

function useAuth<T>(key?: T) {
    const { data, isError, isLoading, error, isFetching, ...rest } = useQuery<
        IUserProfile,
        IError
    >({
        queryKey: ['user', key],
        queryFn: async () => {
            return (await UserService.getProfile()).data
        },
        retry: false,
        select: (data) => data,
    })

    const isAuth = !!data?.email

    const loadingPercentage = isLoading ? 0 : isFetching ? 50 : 100

    return {
        data,
        isError,
        isLoading,
        error,
        isAuth,
        loadingPercentage,
        ...rest,
    }
}

export default useAuth
