import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import InputDinamic from '@/components/ui/input-search'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SchemaDevice } from '@/pages/branch/inventory/validate/device-validate'
import { Pencil, PlusCircle, Trash } from 'lucide-react'
import { useState } from 'react'
import { Control, useFieldArray } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface GpuItemProps {
    control: Control<z.infer<typeof SchemaDevice>>
    watch: unknown
}
interface Gpu {
    brand: string
    model: string
    vram: string
    position: string
    item?: number
}

export function GpuItem({ control }: GpuItemProps) {
    const [StateDialog, setStateDialog] = useState<boolean>(false)
    const [GpuState, setGpuState] = useState<Gpu>({
        brand: '',
        model: '',
        vram: '0',
        position: '',
    })
    const fieldGpu = useFieldArray({
        control,
        name: 'gpu',
    })

    function Update(index: number) {
        const data = fieldGpu.fields[index]
        setGpuState({
            brand: data.brand,
            model: data.model,
            vram: data.vram,
            position: data.position,
            item: index,
        })

        setStateDialog(true)
    }
    function Delete(index: number) {
        fieldGpu.remove(index)
        toast.success('Tarjeta de video eliminada')
    }
    return (
        <div>
            <h3 className="py-2">Tarjeta de Video</h3>
            <ScrollArea className="md:h-[80px] mt-1">
                <div className="grid gap-1">
                    {fieldGpu.fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="border rounded-lg p-3 flex justify-between"
                        >
                            <ul className="text-xs">
                                <li>Marca: {field.brand}</li>
                                <li>Vram: {field.vram} Gb</li>
                                <li>Posición: {field.position}</li>
                            </ul>
                            <div className="flex justify-center items-center gap-2">
                                <Pencil
                                    onClick={() => Update(index)}
                                    className="w-4 h-4"
                                />
                                <Trash
                                    onClick={() => Delete(index)}
                                    className="w-4 h-4"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <Dialog open={StateDialog} onOpenChange={setStateDialog}>
                <DialogTrigger asChild>
                    <Button size={'icon'}>
                        <PlusCircle className="w-4 h-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Registrando una GPU</DialogTitle>
                        <DialogDescription>
                            Agrega una tarjeta de video
                        </DialogDescription>
                    </DialogHeader>
                    <main>
                        <Label>
                            Marca
                            <InputDinamic
                                value={GpuState.brand}
                                data={[
                                    'Nvidia',
                                    'AMD',
                                    'Intel',
                                    'EVGA',
                                    'MSI',
                                    'Gigabyte',
                                    'Asus',
                                    'Zotac',
                                    'Sapphire',
                                    'XFX',
                                    'XFX',
                                    'Zotac',
                                    'PNY',
                                    'EVGA',
                                    'MSI',
                                    'Gigabyte',
                                    'Asus',
                                    'Sapphire',
                                ]}
                                onChange={(value) => {
                                    setGpuState((prev) => ({
                                        ...prev,
                                        brand: value,
                                    }))
                                }}
                            />
                        </Label>
                        <Label>
                            Modelo
                            <Input
                                value={GpuState.model}
                                onChange={(e) =>
                                    setGpuState((prev) => ({
                                        ...prev,
                                        model: e.target.value,
                                    }))
                                }
                            />
                        </Label>
                        <Label>
                            Vram
                            <Input
                                value={GpuState.vram}
                                type="number"
                                onChange={(e) =>
                                    setGpuState((prev) => ({
                                        ...prev,
                                        vram: e.target.value,
                                    }))
                                }
                            />
                        </Label>
                        <Label>
                            Posicion
                            <InputDinamic
                                value={GpuState.position}
                                onChange={(value) =>
                                    setGpuState((prev) => ({
                                        ...prev,
                                        position: value,
                                    }))
                                }
                                data={[
                                    'PCI',
                                    'Integrated Graphics',
                                    'PCI Express',
                                    'AGP',
                                    'PCI Express 2.0',
                                ]}
                            />
                        </Label>

                        <Button
                            className="mt-3"
                            onClick={() => {
                                if (
                                    GpuState.brand === '' ||
                                    GpuState.model === '' ||
                                    GpuState.vram === '' ||
                                    GpuState.position === ''
                                ) {
                                    return toast.error(
                                        'Todos los campos son requeridos'
                                    )
                                }

                                if (GpuState.item) {
                                    fieldGpu.update(GpuState.item, GpuState)
                                    toast.success(
                                        'Tarjeta de video actualizada'
                                    )
                                    setGpuState({
                                        brand: '',
                                        model: '',
                                        vram: '0',
                                        position: '',
                                    })
                                    setStateDialog(false)
                                    return
                                }
                                fieldGpu.append(GpuState)
                                toast.success('Tarjeta de video agregada')
                                setGpuState({
                                    brand: '',
                                    model: '',
                                    vram: '0',
                                    position: '',
                                })
                                setStateDialog(false)
                            }}
                        >
                            Agregar
                        </Button>
                    </main>
                </DialogContent>
            </Dialog>
        </div>
    )
}
