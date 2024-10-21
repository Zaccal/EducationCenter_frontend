export enum EnumStatus {
    PENDING = 'PENDING',
    CANCELLED = 'CANCELLED',
    APPRECIATED = 'APPRECIATED',
}

export enum EnumEstimation {
    EXCELLENT = 'EXCELLENT',
    GOOD = 'GOOD',
    AVERAGE = 'AVERAGE',
    POOR = 'POOR',
    FAIL = 'FAIL',
    NOT_ESTIMATED = 'NOT_ESTIMATED',
}

export interface IHomework {
    id: number
    createdAt: Date
    updatedAt: Date
    lessonId: number
    url: string
    comment: string | null
    status: EnumStatus
    estimation: EnumEstimation
    userId: number
}
