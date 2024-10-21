export function truncateTextByWords(text: string, wordLimit: number) {
    const wordsArray = text.split(' ')
    if (wordsArray.length > wordLimit) {
        return wordsArray.slice(0, wordLimit).join(' ') + '...'
    }
    return text
}
