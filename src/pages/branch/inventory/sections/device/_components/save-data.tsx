import { Info, Save } from 'lucide-react'
import { useState } from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

export function SaveDevice() {
    const [stateOption, setstateOption] = useState<boolean>(false)
    function Open() {
        setstateOption(true)
    }
    function Close() {
        setstateOption(false)
    }
    return (
        <>
            <AlertDialog open={stateOption} onOpenChange={setstateOption}>
                <AlertDialogTrigger asChild>
                    <div onClick={Open}>
                        <Save className="w-6 h-6" />
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-center">
                            ¿Eliminar datos o continuar registrando?
                        </AlertDialogTitle>

                        <div className="mx-auto  my-10">
                            <Info className="w-10 h-10" />
                        </div>
                        <AlertDialogDescription className='text-center'>
                            Si eliminas tus datos, esta acción no podrá
                            deshacerse. Todos tus datos serán permanentemente
                            borrados de nuestros servidores. ¿Deseas eliminar
                            tus datos o continuar registrando?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className='mt-6 grid grid-cols-2'>
                        <Button variant={'ghost'}>Continuar Registrando</Button>
                        <Button variant={'destructive'}>
                            Continuar Registrando
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
