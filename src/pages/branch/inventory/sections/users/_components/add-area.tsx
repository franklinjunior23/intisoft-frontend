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
import { Trash } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { LocalStorageKeys } from '@/constants/localstorage-keys'
import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { areaCreate } from '@/pages/branch/inventory/validate/area-validate'
import { useStateArea } from '@/pages/branch/inventory/state/state-area'
import { CreateArea } from '@/pages/branch/inventory/service/area.service'

function FormArea() {
    const [dataArea, setdataArea] = useState<areaCreate>({
        name: '',
        branchId: localStorage.getItem(LocalStorageKeys.branch)!,
    })
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setdataArea({
            name: e.target.value,
            branchId: dataArea.branchId,
        })
    }
    const { addArea } = useStateArea()
    const mutateCreate = useMutation({
        mutationFn: async (data: areaCreate) => {
            return CreateArea(data)
        },
        onSuccess: (data) => {
            if (data.success) {
                addArea({
                    id: data.body?.id,
                    name: data.body.name,
                })
                return toast.success(
                    data.message ?? 'area creada correctamente'
                )
            }
            toast.info(
                data.message ??
                    'Error al crear la area | contactase con el soporte'
            )
        },
        onError: (err) => {
            toast.error(`${err.message} - ${err.name}`)
        },
    })

    function Submit() {
        if (dataArea.name === '')
            return toast.error('El nombre de la area no puede estar vacio')
        mutateCreate.mutate(dataArea)
    }

    return (
        <>
            <div className="h-[80%]">
                <div className="flex flex-col h-full justify-between ">
                    <Label hidden>
                        Branch
                        <Input readOnly value={dataArea.branchId} />
                    </Label>
                    <Label>
                        Nombre
                        <Input
                            className="mt-2"
                            name="name"
                            value={dataArea.name}
                            onChange={handleChange}
                        />
                    </Label>
                </div>
                <footer className="grid grid-cols-2 gap-2">
                    <Button
                        type="button"
                        onClick={Submit}
                        disabled={mutateCreate.isPending}
                    >
                        Crear Area
                    </Button>
                    <Button type="button" variant={'ghost'}>
                        Cancelar
                    </Button>
                </footer>
            </div>
        </>
    )
}

function ContentArea() {
    const { area } = useStateArea()
    return (
        <main className="grid grid-cols-[1fr_230px] gap-2 items-start">
            <article className="border flex flex-col gap-2 rounded-lg h-[200px] overflow-y-auto p-2">
                {area.map((areas) => (
                    <div
                        key={areas.id}
                        className="p-2 px-5 flex justify-between items-center rounded-lg border"
                    >
                        <span>{areas.name}</span>
                        <Trash className="w-4  h-4" />
                    </div>
                ))}
                {area.length === 0 && <div>No hay areas</div>}
            </article>
            <article className="h-full">
                <FormArea />
            </article>
        </main>
    )
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
                    <DialogTitle>Crear Area </DialogTitle>
                    <DialogDescription>Crear una nueva area</DialogDescription>
                </DialogHeader>

                <ContentArea />
            </DialogContent>
        </Dialog>
    )
}
