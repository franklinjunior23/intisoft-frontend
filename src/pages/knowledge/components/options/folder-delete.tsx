import { ContextMenuItem } from '@/components/ui/context-menu'
import { Trash } from 'lucide-react'
import { DeleteFold } from '../../service/delete-folder'
import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

type DeleteFolderProps = {
    id: string
    setisOpenMenu: (value: boolean) => void
}

export function DeleteFolder({ id, setisOpenMenu }: DeleteFolderProps) {
    const [isPopover, setisPopover] = useState<boolean>(false)
    const { mutate, isPending } = DeleteFold({
        onSuccess(data) {
            if (data?.success) {
                toast.success('Carpeta eliminada')
                setisOpenMenu(false)
            }
        },
        onError(error) {
            if (error) {
                toast.error('Error al eliminar la carpeta')
                toast.error(error?.message)
            }
        },
    })
    function Submit() {
        mutate(id)
    }
    return (
        <>
            <ContextMenuItem
                onClick={(e) => {
                    e.preventDefault()
                    setisPopover(true)
                }}
            >
                <div className="flex gap-2 items-center">
                    <Trash className="h-4 w-4" />
                    Eliminar
                </div>
            </ContextMenuItem>
            <Dialog open={isPopover}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            ¿Estas Seguro de eliminar esta carpeta?
                        </DialogTitle>
                        <DialogDescription>
                            Al eliminar esta carpeta se eliminaran todos los
                            documentos que contiene.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            onClick={() => setisPopover(false)}
                            variant="ghost"
                        >
                            Cancelar
                        </Button>
                        <Button
                            disabled={isPending}
                            onClick={() => Submit()}
                            variant="destructive"
                        >
                            {isPending ? 'Eliminando...' : 'Eliminar'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
