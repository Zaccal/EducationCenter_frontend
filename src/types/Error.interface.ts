interface IResponseData {
    statusCode: number
    message: string | string[]
}

interface IResponse {
    data: IResponseData
}

export interface IError {
    response: IResponse
    status: number
}
