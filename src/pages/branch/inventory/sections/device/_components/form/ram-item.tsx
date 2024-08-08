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
import { ScrollArea } from '@/components/ui/scroll-area'
import { SchemaDevice } from '@/pages/branch/inventory/validate/device-validate'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { Control, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { brandRam } from '../../constants/brands-device'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select'
import { SelectValue } from '@radix-ui/react-select'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

interface RamItemProps {
    control: Control<z.infer<typeof SchemaDevice>>
}

interface Ram {
    brand: string
    model: string
    capacity: string
    type: string
    speed: string
}
interface ModalRamProps {
    add: (data: Ram) => void
}

export function ModalRam({ add }: ModalRamProps) {
    const [StateDialog, setStateDialog] = useState<boolean>(false)
    const [DataRam, setDataRam] = useState<Ram>({
        brand: '',
        model: '',
        capacity: '',
        type: '',
        speed: '',
    })
    function Create() {
        add(DataRam)
        toast.success('Memoria Ram agregada')
        setDataRam({
            brand: '',
            model: '',
            capacity: '',
            type: '',
            speed: '',
        })
        setStateDialog(false)
    }

    return (
        <Dialog open={StateDialog} onOpenChange={setStateDialog}>
            <DialogTrigger asChild>
                <Button size={'icon'}>
                    <PlusCircle className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Creando un nuevo modulo de ram</DialogTitle>
                    <DialogDescription>
                        Registrar un nuevo modulo de ram
                    </DialogDescription>
                </DialogHeader>
                <main className="grid gap-2.5">
                    <Label>
                        Marca
                        <InputDinamic
                            data={brandRam}
                            value={DataRam.brand}
                            placeholder="Marca de la memoria ram .."
                            onChange={(value) =>
                                setDataRam({ ...DataRam, brand: value })
                            }
                        />
                    </Label>
                    <Label>
                        Model
                        <Input
                            value={DataRam.model}
                            onChange={(e) =>
                                setDataRam({
                                    ...DataRam,
                                    model: e.target.value,
                                })
                            }
                            placeholder="Modelo de la memoria ram .."
                        />
                    </Label>
                    <Label>
                        Tipo de memoria
                        <Select
                            value={DataRam.type}
                            onValueChange={(value) =>
                                setDataRam({ ...DataRam, type: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccione el tipo de memoria" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="DDR3">DDR3</SelectItem>
                                <SelectItem value="DDR4">DDR4</SelectItem>
                                <SelectItem value="DDR5">DDR5</SelectItem>
                            </SelectContent>
                        </Select>
                    </Label>
                    <Label>
                        Capacidad
                        <Input
                            type="number"
                            value={DataRam.capacity}
                            onChange={(e) =>
                                setDataRam({
                                    ...DataRam,
                                    capacity: String(e.target.value),
                                })
                            }
                            placeholder="Capacidad de la memoria ram .."
                        />
                    </Label>
                    <Label>
                        Mhz
                        <Input
                            type="number"
                            value={DataRam.speed}
                            onChange={(e) =>
                                setDataRam({
                                    ...DataRam,
                                    speed: e.target.value,
                                })
                            }
                            placeholder="Mhz de la memoria ram .."
                        />
                    </Label>

                    <Button onClick={Create}>Crear</Button>
                </main>
            </DialogContent>
        </Dialog>
    )
}

export function RamItem({ control }: RamItemProps) {
    const fields = useFieldArray({
        control,
        name: 'ram',
    })

    function add(data: Ram) {
        fields.append(data)
    }

    return (
        <div>
            <h3 className="py-2">Memoria Ram</h3>

            <ScrollArea className="h-[85px]">
                {fields.fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="border rounded-lg p-3 flex justify-between"
                    >
                        <ul className="text-xs">
                            <li>Marca: {field.brand}</li>
                            <li>Modelo: {field.model}</li>
                            <li>Capacidad: {field.capacity} Gb</li>
                            <li>Tipo: {field.type}</li>
                            <li>Velocidad: {field.speed} Mhz</li>
                        </ul>
                    </div>
                ))}
            </ScrollArea>
            <ModalRam add={add} />
        </div>
    )
}
