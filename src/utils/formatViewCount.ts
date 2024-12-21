export function formatViewCount(count: number): string {
    if (count < 1_000) {
        return `${count} ${getViewWord(count)}`
    } else if (count < 1_000_000) {
        const thousands = Math.floor(count / 1_000)
        return `${thousands} тыс. просмотров`
    } else if (count < 1_000_000_000) {
        const millions = Math.floor(count / 1_000_000)
        return `${millions} миллион${getWordEnding(millions)} просмотров`
    } else {
        const billions = Math.floor(count / 1_000_000_000)
        return `${billions} миллиард${getWordEnding(billions)} просмотров`
    }
}

function getViewWord(count: number): string {
    const remainder = count % 10
    const remainderHundred = count % 100
    if (remainder === 1 && remainderHundred !== 11) {
        return 'просмотр'
    } else if (
        remainder >= 2 &&
        remainder <= 4 &&
        !(remainderHundred >= 12 && remainderHundred <= 14)
    ) {
        return 'просмотра'
    } else {
        return 'просмотров'
    }
}

function getWordEnding(count: number): string {
    const remainder = count % 10
    const remainderHundred = count % 100
    if (remainder === 1 && remainderHundred !== 11) {
        return ''
    } else if (
        remainder >= 2 &&
        remainder <= 4 &&
        !(remainderHundred >= 12 && remainderHundred <= 14)
    ) {
        return 'а'
    } else {
        return 'ов'
    }
}
