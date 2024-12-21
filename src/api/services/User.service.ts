import { IUserProfile } from '@/types/User.interface'
import api from '../Interceptor'

export enum UserRoutes {
    user = '/user/',
    userProfile = '/user/profile',
}

class UserService {
    async getProfile() {
        return api.get<IUserProfile>(UserRoutes.userProfile)
    }

    async getProfileById(id: number | string) {
        return api.get<IUserProfile>(UserRoutes.user + id)
    }
}

export default new UserService()
