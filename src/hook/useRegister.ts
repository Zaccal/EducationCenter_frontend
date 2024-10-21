import AuthService from '@/api/services/Auth.service'
import { useToast } from '@/hook/useToast'
import { IError } from '@/types/Error.interface'
import { TypeRegistrationUserData } from '@/types/User.interface'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useRegister = () => {
    const nav = useNavigate()
    const { toast } = useToast()
    const [reqestErrorState, setRequestErrorState] = useState<
        string[] | undefined[]
    >([])
    const {
        mutate: registeration,
        error,
        ...rest
    } = useMutation<AxiosResponse<void>, IError, TypeRegistrationUserData>({
        mutationFn: async (data: TypeRegistrationUserData) => {
            return await AuthService.register(data)
        },
        onSuccess: () => {
            nav('/')
            toast({
                title: 'Вы успешно зарегистрированы !',
                description:
                    'Регистрация прошла успешно теперь вы можете пользоваться системой',
                variant: 'success',
            })
        },
    })

    useEffect(() => {
        if (error) {
            if (Array.isArray(error.response.data.message)) {
                setRequestErrorState(error.response.data.message)
            } else {
                setRequestErrorState([error.response.data.message])
            }
        }
    }, [error])

    return { registeration, error, reqestErrorState, ...rest }
}

export default useRegister
