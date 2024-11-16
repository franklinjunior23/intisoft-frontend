import { TooltipDelay } from '@/components/ui/tooltip-delay'
import { Truncate } from '@/helper/truncate-text'
import { Article } from '@/types/knowledge'
import { FileText } from 'lucide-react'
import StoreFile from '../state/file-state'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { DeleteDocument } from './document/delete'

export default function DocumentItem(article: Article) {
    const { addKnowledge } = StoreFile()
    function Add() {
        addKnowledge(article)
    }
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div
                    className="flex items-center py-1 cursor-pointer"
                    onClick={Add}
                >
                    <FileText className="w-4 h-4 mr-2" />
                    <TooltipDelay
                        children={
                            <Truncate text={article.title} maxlength={22} />
                        }
                        content={article.title}
                    />
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <DeleteDocument id={article.id} />
            </ContextMenuContent>
        </ContextMenu>
    )
}
