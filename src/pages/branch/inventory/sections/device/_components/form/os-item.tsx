import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { Control } from 'react-hook-form'
import { z } from 'zod'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { architecture, distroOs, Os } from '@/types/device'
import { Switch } from '@/components/ui/switch'
import { SchemaDevice } from '@/pages/branch/inventory/validate/device-validate'

interface OsItemProps {
    control: Control<z.infer<typeof SchemaDevice>>
}

export function OsItem({ control }: OsItemProps) {
    const OSTYPES = Object.values(Os)
    return (
        <div>
            <h3 className="py-2">Sistema Operativo</h3>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                <FormField
                    name="os.platform"
                    control={control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione el tipo de OS" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {OSTYPES.map((type) => (
                                        <SelectItem key={type} value={type}>
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
                    name="os.distro"
                    control={control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Versión</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione el tipo de OS" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {distroOs.map((type) => (
                                        <SelectItem key={type} value={type}>
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
                    name="os.architecture"
                    control={control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Arquitectura</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione el tipo de OS" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {architecture.map((type) => (
                                        <SelectItem key={type} value={type}>
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
                    name="os.fqdn"
                    control={control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fqdn</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="frijol-HP-xxxx"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="os.serial"
                    control={control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Serial</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="fd7c-8f7d-8f7d-8f7d"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="os.release"
                    control={control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Versión</FormLabel>
                            <FormControl>
                                <Input placeholder="23.03.23" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="os.build"
                    control={control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Build</FormLabel>
                            <FormControl>
                                <Input placeholder="2485" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="os.uefi"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <FormLabel>Uefi</FormLabel>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}
