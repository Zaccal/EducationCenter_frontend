import { IHomework } from './Homework.interface'
import { IQuestion } from './Question.interface'

export enum EnumRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export interface IUser {
    id: number
    firstName: string
    lastName: string
    avatar: string
    email: string
    isBanned: boolean
    role: EnumRole
    questions: IQuestion[]
    homeworks: IHomework[]
}

export interface IUserProfile {
    id: number
    email: string
    firstName: string
    lastName: string
    avatar: string
    role: EnumRole
}

export interface IRegistrationUser
    extends Pick<IUserProfile, 'email' | 'firstName' | 'lastName'> {
    password: string
    confirmPassword: string
}

export type TypeRegistrationUserData = Omit<
    IRegistrationUser,
    'confirmPassword'
>
