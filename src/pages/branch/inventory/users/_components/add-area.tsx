import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { PlusCircledIcon } from '@radix-ui/react-icons'

function FormArea() {
    return <div>hola form Area</div>
}

export function AddArea() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={'icon'}>
                    <PlusCircledIcon className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Crear Usuarios</DialogTitle>
                    <DialogDescription>
                        Crear un nuevo usuario
                    </DialogDescription>
                </DialogHeader>

                <FormArea />
            </DialogContent>
        </Dialog>
    )
}
