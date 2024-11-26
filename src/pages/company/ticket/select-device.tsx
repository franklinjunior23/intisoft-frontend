import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useState } from 'react'
import { Control, useFieldArray } from 'react-hook-form'

type SelectDeviceProps = {
    control: Control
    branchSearch?: string
}

export default function SelectDevice({ control }: SelectDeviceProps) {
    const [StateDialog, setStateDialog] = useState<boolean>(false);
    const {} = useFieldArray({
        control,
        name: 'devices',
    })
    return <AlertDialog>
        <AlertDialogTrigger>

        </AlertDialogTrigger>
        <AlertDialogContent>
            
        </AlertDialogContent>
    </AlertDialog>
}
