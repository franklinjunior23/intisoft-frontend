import { Button } from '@/components/ui/button'
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
import { useCallback, useEffect, useState } from 'react'
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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ActionCreate } from '@/pages/branch/action/device-actiion.service'
import { toast } from 'sonner'
import { LaptopDevice } from '../devices/laptop-device'
import { ServerDevice } from '../devices/servidor-device'
import { PrintDevice } from '../devices/print-device'
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
import { IdDialog } from '@/pages/branch/inventory/constants/id-dialog-device'

interface FormdDeviceProps {
    stateDialog: boolean
    cancelModal: () => void
}

function FormDevice({ stateDialog, cancelModal }: FormdDeviceProps) {
    const client = useQueryClient()
    type FormData = z.infer<typeof SchemaDevice>

    const STATUS = Object.values(deviceStatus)
    const TYPES = Object.values(deviceType)
    const formd = useForm<z.infer<typeof SchemaDevice>>({
        resolver: zodResolver(SchemaDevice),
        defaultValues: {
            branchId: localStorage.getItem(LocalStorageKeys.branch)!,
        },
    })
    const {
        setValue,
        getValues,
        reset,
        watch,
        formState: { errors },
    } = formd

    console.log(errors)
    const MUTATE = useMutation({
        mutationFn: async (data: z.infer<typeof SchemaDevice>) => {
            return await ActionCreate(data)
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message)
                client.refetchQueries()
                localStorage.removeItem(LocalStorageKeys.deviceStorage)
                reset()
                cancelModal()
            }
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    const observerType =
        deviceTypeOptions[formd.watch('information.type') ?? '']

    function Submit(data: z.infer<typeof SchemaDevice>) {
        MUTATE.mutate(data)
    }

    function CancelModal() {
        if (!watch('information.type')) return
        cancelModal()
        SaveData()
    }

    const SaveData = useCallback(() => {
        const currentData = JSON.stringify(getValues())
        localStorage.setItem(LocalStorageKeys.deviceStorage, currentData)
    }, [getValues])

    useEffect(() => {
        const savedData = localStorage.getItem(LocalStorageKeys.deviceStorage)
        if (savedData) {
            const parsedData: FormData = JSON.parse(savedData)
            reset()

            for (const [key, value] of Object.entries(parsedData)) {
                console.log(key)
                setValue(key as keyof FormData, value)
            }
        }
    }, [setValue, reset])

    useEffect(() => {
        const handleBeforeUnload = () => {
            const data = getValues()
            if (data.information.type) {
                SaveData()
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        // Cleanup
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [getValues, SaveData])
    useEffect(() => {
        if (stateDialog) {
            const savedData = localStorage.getItem(
                LocalStorageKeys.deviceStorage
            )
            if (savedData) {
                const parsedData: FormData = JSON.parse(savedData)
                for (const [key, value] of Object.entries(parsedData)) {
                    setValue(key as keyof FormData, value)
                }
            }
        }
    }, [stateDialog, setValue])

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
                                    <FormMessage />{' '}
                                    {MUTATE.isPending
                                        ? 'Guardando...'
                                        : 'Guardar'}
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
                                            value={field.value}
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
                                            {...field}
                                            value={field.value ? field.value.toISOString().split('T')[0] : ''}
                                            placeholder="Select a date"
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
                    {formd.watch('information.type') === deviceType.LAPTOP && (
                        <LaptopDevice
                            control={formd.control}
                            watch={formd.watch}
                        />
                    )}
                    {formd.watch('information.type') === deviceType.SERVER && (
                        <ServerDevice
                            control={formd.control}
                            watch={formd.watch}
                        />
                    )}
                    {formd.watch('information.type') === deviceType.PRINTER && (
                        <PrintDevice
                            control={formd.control}
                            watch={formd.watch}
                        />
                    )}
                    {formd.watch('information.type') === deviceType.RED && (
                        <PrintDevice
                            control={formd.control}
                            watch={formd.watch}
                        />
                    )}
                </main>
                <AlertDialogFooter className="mt-5">
                    <AlertDialogCancel onClick={CancelModal}>
                        Cancel
                    </AlertDialogCancel>

                    <Button type="submit" disabled={MUTATE.isPending}>
                        {MUTATE.isPending ? 'Guardando...' : 'Guardar'}
                    </Button>
                </AlertDialogFooter>
            </form>
        </Form>
    )
}

export function CreateDevice() {
    const [StateDialog, setStateDialog] = useState<boolean>(false)
    function CloseModal() {
        setStateDialog(false)
    }
    return (
        <div>
            <AlertDialog open={StateDialog} onOpenChange={setStateDialog}>
                <AlertDialogTrigger asChild id={IdDialog.DialogDevice}>
                    <Button size={'icon'}>
                        <PlusCircledIcon className="w-4 h-4" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent
                    className={cn(
                        'md:max-w-[950px] overflow-y-auto',
                        'h-[85vh] lg:max-w-[1000px] '
                    )}
                >
                    <AlertDialogHeader>
                        <AlertDialogTitle>Crear Dispositivo</AlertDialogTitle>
                        <AlertDialogDescription>
                            Crear un nuevo dispositivo
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <FormDevice
                        cancelModal={CloseModal}
                        stateDialog={StateDialog}
                    />
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
