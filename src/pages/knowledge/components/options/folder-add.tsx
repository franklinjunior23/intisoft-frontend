import { Button } from '@/components/ui/button'
import { ContextMenuItem } from '@/components/ui/context-menu'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { PostFolder } from '../../service/create-folder'
import { toast } from 'sonner'

type FolderAddProps = {
    setisOpenMenu: (value: boolean) => void
    id?: string
}

export function FolderAdd({ setisOpenMenu, id }: FolderAddProps) {
    const [isPopover, setisPopover] = useState<boolean>(false)
    return (
        <>
            <ContextMenuItem
                onClick={(e) => {
                    e.preventDefault()
                    setisPopover(true)
                }}
            >
                <div
                    className="flex gap-2 items-center"
                    onClick={() => {
                        setisPopover(true)
                    }}
                >
                    <PlusCircle className="h-4 w-4" />
                    Carpeta
                </div>
            </ContextMenuItem>
            <Dialog open={isPopover}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nombre de la carpeta</DialogTitle>
                        <DialogDescription>
                            Escriba el nombre de la carpeta
                        </DialogDescription>
                    </DialogHeader>
                    <AddForm
                        id={id}
                        setClose={() => {
                            setisPopover(false)
                            setisOpenMenu(false)
                        }}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}

type formProps = {
    id?: string
    setClose: () => void
}

function AddForm({ id, setClose }: formProps) {
    const formd = useForm<z.infer<typeof SchemaFolder>>({
        resolver: zodResolver(SchemaFolder),
        defaultValues: {
            parentId: id,
        },
    })
    const { mutate, isPending } = PostFolder({
        onSuccess(data) {
            if (data?.success) {
                toast.success('Carpeta creada')
                setClose()
            }
        },
        onError(error) {
            if (error) {
                toast.error('Error al crear la carpeta')
                toast.error(error?.message)
            }
        },
    })
    function Submit(data: z.infer<typeof SchemaFolder>) {
        mutate(data)
    }
    const { control, handleSubmit } = formd
    return (
        <Form {...formd}>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleSubmit(Submit)()
                }}
            >
                <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Nombre de la carpeta"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="parentId"
                    render={({ field }) => (
                        <FormItem className="invisible">
                            <FormLabel>ParentFolder</FormLabel>
                            <FormControl>
                                <Input placeholder="Folder padre" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Creando...' : 'Crear'}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    )
}

export const SchemaFolder = z.object({
    name: z.string().min(1),
    parentId: z.string().optional(),
})
