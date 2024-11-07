import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

type TooltipProps = {
    children: React.ReactNode
    content: React.ReactNode
}

export function TooltipDelay({ children, content }: TooltipProps) {
    return (
        <TooltipProvider delayDuration={500}>
            <Tooltip>
                <TooltipTrigger >{children}</TooltipTrigger>
                <TooltipContent>{content}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
