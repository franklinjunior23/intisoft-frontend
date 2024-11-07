import { TooltipDelay } from '@/components/ui/tooltip-delay'
import { Truncate } from '@/helper/truncate-text'
import { Article } from '@/types/knowledge'
import { FileText } from 'lucide-react'

type DocumentItemProps = {
    name: string
    id: string
    createdAt: Date
}

export default function DocumentItem({ id, title }: Article) {
    return (
        <div className="flex items-center py-1 cursor-pointer">
            <FileText className="w-4 h-4 mr-2" />
            <TooltipDelay
                children={<Truncate text={title} maxlength={22} />}
                content={title}
            />
        </div>
    )
}
