import { Button } from '@/components/ui/button'
import { Dialog, DialogHeader } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SchemaDevice } from '@/pages/branch/inventory/validate/device-validate'
import {
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Pencil, PlusCircle, Trash } from 'lucide-react'
import { Control, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

interface AccountsProps {
    control: Control<z.infer<typeof SchemaDevice>>
}

interface accounts {
    name: string
    role: string
    user: string
    password: string
}

export function AccountsItem({ control }: AccountsProps) {
    const fields = useFieldArray({
        control,
        name: 'accounts',
    })
    const [StateModal, setStateModal] = useState<boolean>(false)
    const [dataAccount, setdataAccount] = useState<accounts>({
        name: '',
        password: '',
        role: '',
        user: '',
    })
    function Update(index: number) {}

    function Remove(index: number) {
        fields.remove(index)
        toast.success('Cuenta Eliminada correctamente')
    }

    function Add(data: accounts) {
        // Función validadora
        function validate(data: accounts): boolean {
            if (!data.name || !data.password || !data.role || !data.user) {
                return false
            }
            return true
        }

        // Verifica si los datos son válidos
        if (validate(data)) {
            fields.append(data)
            setdataAccount({
                name: '',
                password: '',
                role: '',
                user: '',
            })
            toast.success('Cuenta Registrada')
            setStateModal(false)
        } else {
            toast.error('Todos los campos son obligatorios')
            return
        }
    }

    function SaveAccoount() {
        Add(dataAccount)
    }
    return (
        <div>
            <h3 className="py-2">Cuentas</h3>
            <ScrollArea className="md:h-[80px] mt-1">
                <div className="grid gap-1">
                    {fields.fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="border rounded-lg p-3 flex justify-between"
                        >
                            <ul className="text-xs">
                                <li>Uso :{field.name}</li>
                                <li>Role: {field.role} Gb</li>
                                <li>User: {field.user}</li>
                            </ul>
                            <div className="flex justify-center items-center gap-2">
                                <Pencil
                                    onClick={() => Update(index)}
                                    className="w-4 h-4"
                                />
                                <Trash
                                    onClick={() => Remove(index)}
                                    className="w-4 h-4"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <Dialog open={StateModal} onOpenChange={setStateModal}>
                <DialogTrigger asChild>
                    <Button size={'icon'}>
                        <PlusCircle className="w-4 h-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>Registrar una nueva cuenta</DialogTitle>
                        <DialogDescription>
                            Registra una nueva cuenta
                        </DialogDescription>
                    </DialogHeader>

                    <main>
                        <Label>
                            Nombre
                            <Input
                                value={dataAccount.name}
                                onChange={(e) => {
                                    setdataAccount((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }}
                            />
                        </Label>
                        <Label>
                            Rol
                            <Select
                                value={dataAccount.role}
                                onValueChange={(value) => {
                                    setdataAccount((prev) => ({
                                        ...prev,
                                        role: value,
                                    }))
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue
                                        placeholder={
                                            'Seleccionar el tipo de rol de la cuenta'
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Administrador">
                                        Administrador
                                    </SelectItem>
                                    <SelectItem value="Usuario normal">
                                        Usuario normal
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </Label>
                        <Label>
                            Usuario
                            <Input
                                value={dataAccount.user}
                                onChange={(e) => {
                                    setdataAccount((prev) => ({
                                        ...prev,
                                        user: e.target.value,
                                    }))
                                }}
                            />
                        </Label>
                        <Label>
                            Contraseña
                            <Input
                                value={dataAccount.password}
                                onChange={(e) => {
                                    setdataAccount((prev) => ({
                                        ...prev,
                                        password: e.target.value,
                                    }))
                                }}
                            />
                        </Label>
                        <footer className="mt-4">
                            <Button onClick={SaveAccoount}>Guardar</Button>
                        </footer>
                    </main>
                </DialogContent>
            </Dialog>
        </div>
    )
}
