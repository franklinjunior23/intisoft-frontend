import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import InputDinamic from '@/components/ui/input-search'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { SchemaDevice } from '@/pages/branch/inventory/validate/device-validate'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { Control, useFieldArray } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface StorageItemProps {
    control: Control<z.infer<typeof SchemaDevice>>
}

interface Storage {
    brand: string
    model: string
    capacity: string
    type: string
}

interface ModalStorageProps {
    add: (data: Storage) => void
}
function ModalStorage({ add }: ModalStorageProps) {
    const [StateDialog, setStateDialog] = useState<boolean>(false)
    const [DataStorage, setDataStorage] = useState<Storage>({
        brand: '',
        model: '',
        capacity: '',
        type: '',
    })
    function HandleAdd() {
        add(DataStorage)
        setStateDialog(false)
        toast('Dispositivo de almacenamiento agregado')
        setDataStorage({
            brand: '',
            model: '',
            capacity: '',
            type: '',
        })
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
                    <DialogTitle>
                        Crear un nuevo dispositivo de almacenamiento
                    </DialogTitle>
                    <DialogDescription>
                        Registrar un nuevo dispositivo de almacenamiento
                    </DialogDescription>
                </DialogHeader>

                <main>
                    <Label>
                        Marca
                        <InputDinamic
                            data={[
                                'Lenovo',
                                'HP',
                                'Seagate',
                                'Kingston',
                                'Crucial',
                                'Aorus',
                            ]}
                            value={DataStorage.brand}
                            onChange={(value) =>
                                setDataStorage({ ...DataStorage, brand: value })
                            }
                        />
                    </Label>
                    <Label>
                        Modelo
                        <Input
                            placeholder="Modelo del estado de almacenamiento"
                            value={DataStorage.model}
                            onChange={(e) =>
                                setDataStorage({
                                    ...DataStorage,
                                    model: e.target.value,
                                })
                            }
                        />
                    </Label>
                    <Label>
                        Capacidad
                        <Input
                            type="number"
                            placeholder="Capacidad del almacenamiento"
                            value={DataStorage.capacity}
                            onChange={(e) =>
                                setDataStorage({
                                    ...DataStorage,
                                    capacity: e.target.value,
                                })
                            }
                        />
                    </Label>
                    <Label>
                        Tipo
                        <Select
                            onValueChange={(value) =>
                                setDataStorage({ ...DataStorage, type: value })
                            }
                            defaultValue={DataStorage.type}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccione el tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                {['HDD', 'SSD', 'M.2', 'NVMe'].map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Label>

                    <Button onClick={HandleAdd}>Agregar</Button>
                </main>
            </DialogContent>
        </Dialog>
    )
}

export function StorageItem({ control }: StorageItemProps) {
    const fields = useFieldArray({
        control,
        name: 'storage',
    })

    function Add( data: Storage) {
        fields.append(data)
    }
    return (
        <div>
            <h3 className="py-2">Almacenamiento</h3>
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
                        </ul>
                    </div>
                ))}
            </ScrollArea>
            <div className="grid grid-cols-2 gap-2 gap-y-1">
                <ModalStorage add={Add} />
            </div>
        </div>
    )
}
