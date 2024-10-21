import { ILogin } from '@/types/Auth.inerfaces'
import { TypeRegistrationUserData } from '@/types/User.interface'
import api from '../Interceptor'

export enum EnumAuthRoutes {
    login = '/auth/login',
    logout = '/auth/logout',
    register = '/auth/register',
}

export enum EnumTokens {
    accessToken = 'accessToken',
    refreshToken = 'refreshToken',
}

class AuthService {
    async login(data: ILogin) {
        return await api.post(EnumAuthRoutes.login, data)
    }

    async logOut() {
        return await api.post(EnumAuthRoutes.logout, {})
    }

    async register(data: TypeRegistrationUserData) {
        return await api.post(EnumAuthRoutes.register, data)
    }
}

export default new AuthService()
