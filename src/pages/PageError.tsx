interface IPageError {
    code?: number | string
    message?: string
}

const PageError = ({
    code = 404,
    message = 'Cтраница не найдено',
}: IPageError) => {
    return (
        <>
            <div className="w-fit mx-auto mt-[10%]">
                <h1 className="text-[228px] text-primary font-bold text-center">
                    {code}
                </h1>
                <h2 className="text-3xl text-center font-bold ">
                    Упс... что-то не так пошло
                </h2>
                <p className="text-center mt-4 text-lg">{message}</p>
            </div>
        </>
    )
}

export default PageError
