import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
import { SchemaDevice } from '@/pages/branch/inventory/validate/device-validate'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { deviceStatus, deviceType } from '@/types/device'
import { LocalStorageKeys } from '@/constants/localstorage-keys'
import { PcDevice } from '../devices/pc-device'
import { deviceTypeOptions } from '../../constants/types-device'
import InputDinamic from '@/components/ui/input-search'
import { BrandsDevice } from '../../constants/brands-device'
import { cn } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { ActionCreate } from '@/pages/branch/action/device-actiion.service'

function FormDevice() {
    const MUTATE = useMutation({
        mutationFn: async (data: z.infer<typeof SchemaDevice>) => {
            return await ActionCreate(data)
        },
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        },
    })

    const STATUS = Object.values(deviceStatus)
    const TYPES = Object.values(deviceType)
    const formd = useForm<z.infer<typeof SchemaDevice>>({
        resolver: zodResolver(SchemaDevice),
        defaultValues: {
            branchId: localStorage.getItem(LocalStorageKeys.branch)!,
        },
    })

    const observerType =
        deviceTypeOptions[formd.watch('information.type') ?? '']
    function Submit(data: z.infer<typeof SchemaDevice>) {
        MUTATE.mutate(data)
    }

    return (
        <Form {...formd}>
            <form onSubmit={formd.handleSubmit(Submit)}>
                <main>
                    <div className="grid md:grid-cols-5 gap-3">
                        <FormField
                            name="name"
                            control={formd.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Nombre .."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="nickName"
                            control={formd.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Apodo</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Apodo .."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="codeDevice"
                            control={formd.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Codigo</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Codigo de equipo .."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="information.type"
                            control={formd.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccione el tipo del dispositivo" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {TYPES.map((type) => (
                                                <SelectItem
                                                    key={type}
                                                    value={type}
                                                >
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="information.typeDevice"
                            control={formd.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo de dispositivo</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccione el tipo del dispositivo" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {observerType &&
                                                observerType.length > 0 &&
                                                observerType.map((type) => (
                                                    <SelectItem
                                                        key={type}
                                                        value={type}
                                                    >
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name={`information.brand`}
                            control={formd.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Marca</FormLabel>
                                    <FormControl>
                                        <InputDinamic
                                            placeholder="Seleccione la marca"
                                            data={BrandsDevice}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name={`information.model`}
                            control={formd.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Modelo</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Modelo del equipo .."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name={`information.serialNumber`}
                            control={formd.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Numero de serie</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Numero de serie .."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="dateCreated"
                            control={formd.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fecha de creacion</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            placeholder="Codigo de equipo .."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="status"
                            defaultValue={deviceStatus.ACTIVE}
                            control={formd.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Estado del Dispositivo
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccione el estado del dispositivo" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {STATUS.map((type) => (
                                                <SelectItem
                                                    key={type}
                                                    value={type}
                                                >
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {formd.watch('information.type') === deviceType.DESKTOP && (
                        <PcDevice control={formd.control} watch={formd.watch} />
                    )}
                </main>
                <DialogFooter className="mt-5">
                    <Button type="submit" disabled={MUTATE.isPending}>
                        Guardar
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    )
}

export function CreateDevice() {
    const [StateDialog, setStateDialog] = useState<boolean>(false)
    return (
        <div>
            <Dialog open={StateDialog} onOpenChange={setStateDialog}>
                <DialogTrigger asChild>
                    <Button size={'icon'}>
                        <PlusCircledIcon className="w-4 h-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent
                    className={cn(
                        'md:max-w-[950px] overflow-y-auto',
                        'h-[85vh] lg:max-w-[1000px] '
                    )}
                >
                    <DialogHeader>
                        <DialogTitle>Crear Dispositivo</DialogTitle>
                        <DialogDescription>
                            Crear un nuevo dispositivo
                        </DialogDescription>
                    </DialogHeader>
                    <FormDevice />
                </DialogContent>
            </Dialog>
        </div>
    )
}
