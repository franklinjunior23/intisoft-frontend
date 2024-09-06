import {
    AlertDialog,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import FormVisit from './visit-tech/form'

export default function VisiteTech() {
    const [StateDialog, setStateDialog] = useState<boolean>(false)
    return (
        <AlertDialog open={StateDialog}>
            <AlertDialogTrigger asChild>
                <Button
                    onClick={() => {
                        setStateDialog(true)
                    }}
                >
                    <PlusCircle className="mr-2 size-4" /> Visita Tecnica
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="md:max-w-[700px]">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Registrar una visita tecnica
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Complete el formulario para registrar una visita tecnica
                        a la sucursal seleccionada en el sistema.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <FormVisit />
            </AlertDialogContent>
        </AlertDialog>
    )
}
