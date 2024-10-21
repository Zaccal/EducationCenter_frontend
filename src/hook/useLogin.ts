import AuthService from '@/api/services/Auth.service'
import { queryClient } from '@/main'
import { ILogin } from '@/types/Auth.inerfaces'
import { IError } from '@/types/Error.interface'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useToast } from './useToast'

const useLogin = () => {
    const nav = useNavigate()
    const { toast } = useToast()
    const {
        isPending,
        mutate: login,
        error,
        ...rest
    } = useMutation<AxiosResponse<void>, IError, ILogin>({
        mutationFn: (data: ILogin) => {
            return AuthService.login(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user'],
            })
            nav('/')
            toast({
                title: 'Вы успешно вошли в систему !',
                description:
                    'Вход в систему прошла успешно теперь вы можете пользоваться системой',
                variant: 'success',
            })
        },
    })

    return { isPending, login, error, ...rest }
}

export default useLogin
