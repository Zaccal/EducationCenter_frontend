import UserService from '@/api/services/User.service'
import { useQuery } from '@tanstack/react-query'

const useGetProfile = (id: string | number) => {
    return useQuery({
        queryKey: ['user-profile', id],
        queryFn: async () => {
            return await UserService.getProfileById(id)
        },
        select(data) {
            return data.data
        },
    })
}

export default useGetProfile
