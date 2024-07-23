export function Truncate({
    text,
    maxlength,
}: {
    text: string
    maxlength: number
}) {
    if (!text) throw new Error('Text is required')
    return text.length > maxlength ? text.slice(0, maxlength) + '...' : text
}
