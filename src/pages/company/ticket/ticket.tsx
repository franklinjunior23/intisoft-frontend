import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import FormTicket from './form-ticket'

export default function TicketBranch() {
    const [StateDialog, setStateDialog] = useState<boolean>(false)

    function Close() {
        setStateDialog(false)
    }

    return (
        <AlertDialog open={StateDialog} onOpenChange={setStateDialog}>
            <AlertDialogTrigger asChild>
                <Button size="sm" className="flex gap-2">
                    <PlusCircle className="w-4 h-4" />
                    Crear Ticket
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-5xl">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Crear un ticket de soporte
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Complete el formulario para crear un ticket de soporte
                        para la sucursal seleccionada en el sistema.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <FormTicket CloseDialog={Close} />
                <FooterDialog />
            </AlertDialogContent>
        </AlertDialog>
    )
}

function FooterDialog() {
    return (
        <AlertDialogFooter>
            <Button>Crear</Button>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
        </AlertDialogFooter>
    )
}
