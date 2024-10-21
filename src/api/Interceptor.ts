import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { EnumTokens } from './services/Auth.service'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    const accessToken = Cookies.get(EnumTokens.accessToken)

    if (accessToken) config.headers['Authorization'] = 'Bearer ' + accessToken

    return config
})

interface IErrorConfig extends InternalAxiosRequestConfig {
    _isRetry: boolean
}

interface IError extends AxiosError {
    config: IErrorConfig
}

api.interceptors.response.use(
    (response) => response,
    async (error: IError) => {
        const originRequest = error.config

        if (error.status === 401 && !originRequest._isRetry) {
            originRequest._isRetry = true

            try {
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/auth/login-access`,
                    {},
                    {
                        withCredentials: true,
                    }
                )
            } catch (error) {
                return Promise.reject(error)
            }
        }

        return Promise.reject(error)
    }
)

export default api
