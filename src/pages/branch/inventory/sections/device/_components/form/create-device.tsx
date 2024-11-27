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
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { device, deviceStatus, deviceType } from '@/types/device'
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import FieldArea from '../../../users/_components/form/field-area'
import VinculeUser from '../../../users/_components/vincule-user'
import { PutDevice } from '../../service/update-device'

interface FormdDeviceProps {
    stateDialog: boolean
    cancelModal: () => void
    dataDevice: device | null
}

export function FormDevice({
    stateDialog,
    cancelModal,
    dataDevice,
}: FormdDeviceProps) {
    const client = useQueryClient()
    type FormData = z.infer<typeof SchemaDevice>

    const MUTATEUPDATE = PutDevice({})

    const STATUS = Object.values(deviceStatus)
    const TYPES = Object.values(deviceType)
    const formd = useForm<z.infer<typeof SchemaDevice>>({
        resolver: zodResolver(SchemaDevice),
        defaultValues: {
            id: dataDevice?.id,
            branchId: localStorage.getItem(LocalStorageKeys.branch)!,
            information: {
                type: dataDevice?.information.type,
                typeDevice: dataDevice?.information.typeDevice,
                brand: dataDevice?.information.brand,
                model: dataDevice?.information.model,
            },
            dateCreated: dataDevice?.dateCreated
                ? format(new Date(dataDevice.dateCreated), 'PPP')
                : new Date(),
            areaId: dataDevice?.area?.id ? String(dataDevice.area.id) : '',
            userId: dataDevice?.user?.id ? String(dataDevice?.user?.id) : '',
            codeDevice: dataDevice?.codeDevice,
            os: {
                platform: dataDevice?.details.os?.platform,
                architecture: dataDevice?.details.os?.architecture,
                distro: dataDevice?.details.os?.distro,
                serial: dataDevice?.details.os?.serial,
                uefi: dataDevice?.details.os?.uefi,
                build: dataDevice?.details.os?.build,
                fqdn: dataDevice?.details.os?.fqdn,
                kernel: dataDevice?.details.os?.kernel,
                release: dataDevice?.details.os?.release,
            },
            motherboard: {
                brand: dataDevice?.details.motherboard?.brand,
                model: dataDevice?.details.motherboard?.model,
                quantitySlots: dataDevice?.details.motherboard?.quantitySlots,
                socket: dataDevice?.details.motherboard?.socket,
            },
            cpu: {
                brand: dataDevice?.details.cpu?.brand,
                model: dataDevice?.details.cpu?.model,
                cores: String(dataDevice?.details.cpu?.cores),
                threads: String(dataDevice?.details.cpu?.threads),
            },
            anydesk: {
                id: dataDevice?.anydesk?.id,
                password: dataDevice?.anydesk?.password,
            },
            gpu:
                dataDevice?.details?.graphic.map((gpu) => ({
                    ...gpu,
                    brand: gpu.brand,
                    model: gpu.model,
                    vram: String(gpu.vram),
                })) ?? [],
            ram:
                dataDevice?.details.ram?.map((ram) => ({
                    ...ram,
                    speed: String(ram.speed),
                    capacity: String(ram.capacity),
                })) ?? [],
            storage:
                dataDevice?.details.storage?.map((storage) => ({
                    ...storage,
                    capacity: String(storage.capacity),
                })) ?? [],
            network: dataDevice?.details.network?.map((net) => ({
                ...net,
                mac: net.mac ?? '0',
                speed: String(net.speed) ?? '0',
            })),
        },
    })
    const {
        setValue,
        watch,
        formState: { errors },
    } = formd
    console.log(errors)
    const MUTATE = useMutation({
        mutationFn: async (data: z.infer<typeof SchemaDevice>) => {
            return await ActionCreate(data)
        },
        onSuccess: (data) => {
            if (data?.success) {
                toast.success(data.message)
                client.refetchQueries()
                // localStorage.removeItem(LocalStorageKeys.deviceStorage)
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
        if (!dataDevice) {
            MUTATE.mutate(data)
        }

        MUTATEUPDATE.mutate(data)
    }

    function CancelModal() {
        if (!watch('information.type')) return
        cancelModal()
    }

    useEffect(() => {
        if (dataDevice) {
            for (const [key, value] of Object.entries(dataDevice)) {
                setValue(key as keyof FormData, value)
            }
            console.log(dataDevice)
            setValue('information.type', dataDevice.information.type)
            setValue(
                'information.typeDevice',
                dataDevice.information.typeDevice
            )
        }
    }, [dataDevice, setValue])

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
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    formd.handleSubmit(Submit)()
                }}
            >
                <main className="grid md:grid-cols-2 gap-5 overflow-y-auto">
                    <div>
                        <div className="grid md:grid-cols-3 gap-2">
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
                                        <FormLabel>
                                            Tipo de dispositivo
                                        </FormLabel>
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
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel>
                                            Fecha de adquisicion
                                        </FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={'outline'}
                                                        className={cn(
                                                            'w-full  text-left font-normal',
                                                            !field.value &&
                                                                'text-muted-foreground'
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                'PPP'
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    captionLayout="dropdown-buttons"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    fromYear={1960}
                                                    toYear={new Date().getFullYear()}
                                                />
                                            </PopoverContent>
                                        </Popover>
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
                        <div className="mt-3 grid grid-cols-2 gap-2 items-start">
                            <FieldArea control={formd.control} />
                            {/* <DeviceVincule control={formd.control} /> */}
                            <VinculeUser control={formd.control} />
                        </div>
                    </div>
                    <div className="flex flex-col md:h-[400px] overflow-y-auto">
                        {formd.watch('information.type') ===
                            deviceType.DESKTOP && (
                            <PcDevice
                                control={formd.control}
                                watch={formd.watch}
                            />
                        )}
                        {formd.watch('information.type') ===
                            deviceType.LAPTOP && (
                            <LaptopDevice
                                control={formd.control}
                                watch={formd.watch}
                            />
                        )}
                        {formd.watch('information.type') ===
                            deviceType.SERVER && (
                            <ServerDevice
                                control={formd.control}
                                watch={formd.watch}
                            />
                        )}
                        {formd.watch('information.type') ===
                            deviceType.PRINTER && (
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
                    </div>
                </main>
                <AlertDialogFooter className="mt-5">
                    <AlertDialogCancel onClick={CancelModal}>
                        Cancel
                    </AlertDialogCancel>

                    <Button type="submit" disabled={MUTATE.isPending}>
                        {dataDevice ? (
                            <>
                                {' '}
                                {MUTATEUPDATE.isPending
                                    ? 'Actualizando ...'
                                    : 'Actualizar'}{' '}
                            </>
                        ) : (
                            <>{MUTATE.isPending ? 'Guardando...' : 'Guardar'}</>
                        )}
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
                        'md:max-w-[950px] overflow-y-auto max-sm:max-h-[70vh] md:overflow-y-hidden ',
                        ' lg:max-w-[1200px] '
                    )}
                >
                    <AlertDialogHeader>
                        <AlertDialogTitle>Crear Dispositivo</AlertDialogTitle>
                        <AlertDialogDescription>
                            Crear un nuevo dispositivo
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <FormDevice
                        dataDevice={null}
                        cancelModal={CloseModal}
                        stateDialog={StateDialog}
                    />
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
