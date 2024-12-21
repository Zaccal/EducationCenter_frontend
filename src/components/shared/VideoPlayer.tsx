import { EnumCookie } from '@/types/Cookie.enum'
import { convertYouTubeUrlToEmbed } from '@/utils/ConvertYouTubeUrlToEmbed'
import { useState } from 'react'
import { getCookieConsentValue } from 'react-cookie-consent'
import { Skeleton } from '../ui/skeleton'
import NotavilableVideo from './NotavilableVideo'

interface IVideoPlayer {
    url: string
}

const VideoPlayer = ({ url }: IVideoPlayer) => {
    const [isLoading, setLoading] = useState(true)
    const isShowVideo =
        getCookieConsentValue(EnumCookie.YOUTUBE_COOKIE) || false
            ? JSON.parse(
                  getCookieConsentValue(EnumCookie.YOUTUBE_COOKIE) as string
              )
            : false

    if (!isShowVideo) return <NotavilableVideo />

    return (
        <div className="col-span-8">
            {isLoading && <Skeleton className="w-full h-[460px] rounded-lg" />}

            <iframe
                height={460}
                src={convertYouTubeUrlToEmbed(url || '') || ''}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                onLoad={() => setLoading(false)}
                style={{
                    display: isLoading ? 'none' : 'block',
                }}
                allowFullScreen={true}
                className="w-full rounded-lg"
            ></iframe>
        </div>
    )
}

export default VideoPlayer
