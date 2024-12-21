export function convertYouTubeUrlToEmbed(url: string): string | null {
    const embedUrlMatch = url.match(
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/
    )
    if (embedUrlMatch) {
        return url
    }

    const videoIdMatch = url.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    )

    if (videoIdMatch && videoIdMatch[1]) {
        const videoId = videoIdMatch[1]
        return `https://www.youtube.com/embed/${videoId}`
    } else {
        console.error('Invalid YouTube URL')
        return null
    }
}
