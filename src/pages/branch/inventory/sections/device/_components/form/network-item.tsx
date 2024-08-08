import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import { SchemaDevice } from '@/pages/branch/inventory/validate/device-validate'
import { Pencil, PlusCircle, Trash } from 'lucide-react'
import { useState } from 'react'
import { Control, useFieldArray } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export interface NetworkItemProps {
    control: Control<z.infer<typeof SchemaDevice>>
}

interface Network {
    name: string
    mac: string
    ip3: string
    ip6: string
    type: string
    speed: string
    status: string
    isDhcp: boolean
    isVirtual: boolean
}
export function NetworkItem({ control }: NetworkItemProps) {
    const fields = useFieldArray({
        control,
        name: 'network',
    })
    const [StateDialog, setStateDialog] = useState<boolean>(false)
    const [DataNetwork, setDataNetwork] = useState<Network>({
        mac: '',
        name: '',
        ip3: '',
        ip6: '',
        type: '',
        speed: '',
        status: '',
        isDhcp: false,
        isVirtual: false,
    })

    function SaveData() {
        fields.append(DataNetwork)
        setStateDialog(false)
        toast.success('Registro guardado correctamente')
        setDataNetwork({
            ip3: '',
            ip6: '',
            mac: '',
            name: '',
            type: '',
            speed: '',
            status: '',
            isDhcp: false,
            isVirtual: false,
        })
    }

    return (
        <div>
            <div>
                <h3 className="py-2">Red</h3>
                <ScrollArea className="md:h-[80px] mt-1">
                    <div className="grid gap-1">
                        {fields.fields.map((field, index) => (
                            <div
                                key={field.id}
                                className="border rounded-lg p-3 flex justify-between"
                            >
                                <ul className="text-xs">
                                    <li>Ip3: {field.ip3}</li>
                                    <li>Ip4: {field.ip6} Gb</li>
                                    <li>Name: {field.name}</li>
                                </ul>
                                <div className="flex justify-center items-center gap-2">
                                    <Pencil className="w-4 h-4" />
                                    <Trash
                                        onClick={() => fields.remove(index)}
                                        className="w-4 h-4"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
            <Dialog open={StateDialog} onOpenChange={setStateDialog}>
                <DialogTrigger asChild>
                    <Button size={'icon'}>
                        <PlusCircle className="w-4 h-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Registrando un nuevo modulo de Network
                        </DialogTitle>
                        <DialogDescription>
                            Registra de manera correcta el modulo de network
                        </DialogDescription>
                    </DialogHeader>
                    <main>
                        <Label>
                            Nombre de la red
                            <Input
                                value={DataNetwork.name}
                                onChange={(e) => {
                                    setDataNetwork((prev) => {
                                        return { ...prev, name: e.target.value }
                                    })
                                }}
                            />
                        </Label>
                        <Label>
                            Ip3
                            <Input
                                value={DataNetwork.ip3}
                                onChange={(e) => {
                                    setDataNetwork((prev) => {
                                        return { ...prev, ip3: e.target.value }
                                    })
                                }}
                            />
                        </Label>
                        <Label>
                            Ip6
                            <Input
                                value={DataNetwork.ip6}
                                onChange={(e) => {
                                    setDataNetwork((prev) => {
                                        return { ...prev, ip6: e.target.value }
                                    })
                                }}
                            />
                        </Label>
                        <Label>
                            Tipo
                            <Input
                                value={DataNetwork.type}
                                onChange={(e) => {
                                    setDataNetwork((prev) => {
                                        return { ...prev, type: e.target.value }
                                    })
                                }}
                            />
                        </Label>
                        <Label>
                            Velocidad
                            <Input
                                value={DataNetwork.speed}
                                onChange={(e) => {
                                    setDataNetwork((prev) => {
                                        return {
                                            ...prev,
                                            speed: e.target.value,
                                        }
                                    })
                                }}
                            />
                        </Label>
                        <Label>
                            Estado
                            <Input
                                value={DataNetwork.status}
                                onChange={(e) => {
                                    setDataNetwork((prev) => {
                                        return {
                                            ...prev,
                                            status: e.target.value,
                                        }
                                    })
                                }}
                            />
                        </Label>

                        <div className="w-full p-4 rounded-lg border  flex justify-between items-center mt-2">
                            <Label className="w-full">DHCP</Label>
                            <div>
                                <Switch
                                    checked={DataNetwork.isDhcp}
                                    onCheckedChange={(val) => {
                                        setDataNetwork((prev) => {
                                            return { ...prev, isDhcp: val }
                                        })
                                    }}
                                />
                            </div>
                        </div>
                        <div className="w-full p-4 rounded-lg border  flex justify-between items-center mt-2">
                            <Label className="w-full">Virtual</Label>
                            <div>
                                <Switch
                                    checked={DataNetwork.isVirtual}
                                    onCheckedChange={(val) => {
                                        setDataNetwork((prev) => {
                                            return { ...prev, isVirtual: val }
                                        })
                                    }}
                                />
                            </div>
                        </div>
                        <footer className="mt-3">
                            <Button onClick={SaveData}>Guardar</Button>
                        </footer>
                    </main>
                </DialogContent>
            </Dialog>
        </div>
    )
}
