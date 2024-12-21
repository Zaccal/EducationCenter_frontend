export interface IAnswer {
    id: number
    createdAt: Date
    updatedAt: Date
    userId: number
    questionId: number
    comment: string
    user: IUserAnswer
}

interface IUserAnswer {
    id: number
    firstName: string
    lastName: string
    avatar: string
}
