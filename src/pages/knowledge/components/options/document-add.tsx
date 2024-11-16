import { ContextMenuItem } from '@/components/ui/context-menu'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { FormKnowledge } from './form -knowledge'

type DocumentAddProps = {
    setisOpenMenu: (value: boolean) => void
    id?: string
}
export function DocumentAdd({ id, setisOpenMenu }: DocumentAddProps) {
    const [DialogState, setDialogState] = useState<boolean>(false)

    function CloseDialog() {
        setDialogState(false)
        setisOpenMenu(false)
    }

    return (
        <>
            <ContextMenuItem
                onClick={(e) => {
                    e.preventDefault()
                    setDialogState(true)
                }}
            >
                <div
                    className="flex gap-2 items-center"
                    onClick={() => {
                        setDialogState(true)
                    }}
                >
                    <PlusCircle className="h-4 w-4" />
                    Documento
                </div>
            </ContextMenuItem>
            <Dialog open={DialogState}>
                <DialogContent className="max-w-[1200px]">
                    <DialogHeader>
                        <DialogTitle>
                            Crear un articulo de la base de conocimiento
                        </DialogTitle>
                        <DialogDescription>
                            Completa los campos para crear un nuevo articulo en
                            la base de conocimiento
                        </DialogDescription>
                    </DialogHeader>

                    <FormKnowledge folderId={id} dialogClose={CloseDialog} />
                </DialogContent>
            </Dialog>
        </>
    )
}
