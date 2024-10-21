import AuthService from '@/api/services/Auth.service'
import { queryClient } from '@/main'
import { useMutation } from '@tanstack/react-query'

const useLogout = () => {
    const { mutate: logout, ...rest } = useMutation({
        mutationFn: async () => {
            return AuthService.logOut()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })

            window.location.reload()
        },
    })

    return { logout, ...rest }
}

export default useLogout
