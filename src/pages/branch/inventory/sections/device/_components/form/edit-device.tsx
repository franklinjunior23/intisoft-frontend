import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { FormDevice } from './create-device'
import useDeviceStore from '../../one-device/hoock/iddevice-data'
import { Button } from '@/components/ui/button'

export function EditDevice() {
    const [StateDialog, setStateDialog] = useState<boolean>(false)
    const { data } = useDeviceStore()
    return (
        <AlertDialog onOpenChange={setStateDialog} open={StateDialog}>
            <AlertDialogTrigger >
                <Button size="icon">
                    <Pencil className="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="md:max-w-[950px] lg:max-w-[1200px] overflow-y-auto max-sm:max-h-[70vh] md:overflow-y-hidden ">
                <AlertDialogHeader>
                    <AlertDialogTitle>Editar dispositivo</AlertDialogTitle>
                    <AlertDialogDescription>
                        Edite la información del dispositivo
                    </AlertDialogDescription>
                </AlertDialogHeader>
                {StateDialog && (
                    <FormDevice
                        cancelModal={() => {
                            setStateDialog(false)
                        }}
                        stateDialog={StateDialog}
                        dataDevice={data}
                    />
                )}
            </AlertDialogContent>
        </AlertDialog>
    )
}
