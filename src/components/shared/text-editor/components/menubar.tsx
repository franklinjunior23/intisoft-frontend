import { Toggle } from '@/components/ui/toggle'
import { useCurrentEditor } from '@tiptap/react'
import { BoldIcon } from 'lucide-react'

export function MenuBar() {
    const { editor } = useCurrentEditor()
    if (!editor) return null

    return (
        <>
            <Toggle aria-label="Toggle bold" disabled>
                <BoldIcon className="h-4 w-4" />
            </Toggle>
            <Toggle aria-label="Toggle bold" disabled>
                <BoldIcon className="h-4 w-4" />
            </Toggle>
        </>
    )
}
