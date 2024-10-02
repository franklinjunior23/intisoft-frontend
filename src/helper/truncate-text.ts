export function Truncate({
    text,
    maxlength,
}: {
    text: string
    maxlength: number
}) {
    if (!text) {
        console.error('Text is required')
        text = 'Value not found'
    }
    return text.length > maxlength ? text.slice(0, maxlength) + '...' : text
}
