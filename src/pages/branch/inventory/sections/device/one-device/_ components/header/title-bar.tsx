interface TitleProps {
    title: string
    className?: string
}
export function TitleBar({ className, title }: TitleProps) {
    return <h3 className={`${className} font-bold text-lg `}>{title}</h3>
}

export function TitleSection({ title, className }: TitleProps) {
    return (
        <h3 className={`${className} font-medium text-xs  mb-1.5`}>{title}</h3>
    )
}

export function DetailItem({ title }: { title: string }) {
    return <div></div>
}
