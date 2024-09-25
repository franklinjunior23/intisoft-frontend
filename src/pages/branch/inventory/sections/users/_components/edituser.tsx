import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { InstanceAxios } from '@/helper/axios-config'
import { useQuery } from '@tanstack/react-query'
import { FormUser } from './add-user'
import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { user } from '@/types/users'

const GetUser = async (id: string) => {
    const response = await InstanceAxios(`user/${id}`)
    return response.data
}

interface UserViewProps {
    close: () => void
    id: string
}

function UserView({ close, id }: UserViewProps) {
    const { data, isLoading } = useQuery<user>({
        queryKey: ['user', id],
        queryFn: () => GetUser(id),
    })

    return (
        <>
            <AlertDialogHeader>
                <AlertDialogTitle className="flex justify-between items-center">
                    <h3>
                        Editar un Usuario :{' '}
                        {isLoading
                            ? 'Cargando ....'
                            : `${data.name} ${data.lastName}`}
                    </h3>
                    <div className="p-1 px-4 text-sm rounded-lg border">
                        {isLoading ? (
                            <Skeleton className="w-[100px] h-3" />
                        ) : (
                            data.status
                        )}
                    </div>
                </AlertDialogTitle>
                <AlertDialogDescription>
                    Edita los datos del usuario
                </AlertDialogDescription>
            </AlertDialogHeader>
            {isLoading && <div>Loading...</div>}
            {!isLoading && data && (
                <FormUser CloseDialog={close} dataUser={data} />
            )}
        </>
    )
}

export default function EditOneUser({ id }: { id: string }) {
    const [StateDialog, setStateDialog] = useState<boolean>(false)
    function CloseDialog() {
        setStateDialog(false)
    }

    return (
        <>
            <AlertDialog onOpenChange={setStateDialog} open={StateDialog}>
                <AlertDialogTrigger>
                    <Pencil1Icon className="w-4 h-4" />
                </AlertDialogTrigger>
                <AlertDialogContent className="md:max-w-[800px]">
                    {StateDialog && <UserView close={CloseDialog} id={id} />}
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
