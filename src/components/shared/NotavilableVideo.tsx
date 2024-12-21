import { EnumCookie } from '@/types/Cookie.enum'
import Cookies from 'js-cookie'
import { useReducer } from 'react'
import { Button } from '../ui/button'

const NotavilableVideo = () => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0)
    return (
        <>
            <div className="h-[550px] col-span-8 flex items-center justify-center border border-primary">
                <div className=" ">
                    <p className="text-center text-xl mb-4 text-red-500">
                        Чтобы начать просмотр примитие cookies
                    </p>
                    <Button
                        onClick={() => {
                            Cookies.set(EnumCookie.YOUTUBE_COOKIE, 'true')
                            forceUpdate()
                        }}
                        className="mx-auto block"
                    >
                        Принять
                    </Button>
                </div>
            </div>
        </>
    )
}

export default NotavilableVideo
