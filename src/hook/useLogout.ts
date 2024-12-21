import AuthService from '@/api/services/Auth.service'
import { queryClient } from '@/main'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const useLogout = () => {
    const nav = useNavigate()

    const { mutate: logout, ...rest } = useMutation({
        mutationFn: async () => {
            return AuthService.logOut()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })

            nav('/')
            window.location.reload()
        },
    })

    return { logout, ...rest }
}

export default useLogout
