import useAuth from '@/hook/useAuth'
import { ReactElement } from 'react'

interface IPrivateRouteForNotAuth {
    children: ReactElement | ReactElement[]
}

const PrivateRouteForNotAuth = ({ children }: IPrivateRouteForNotAuth) => {
    const { isAuth } = useAuth()

    if (isAuth) return undefined

    return children
}

export default PrivateRouteForNotAuth
