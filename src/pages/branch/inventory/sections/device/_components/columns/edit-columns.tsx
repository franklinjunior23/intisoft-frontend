import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { device, deviceStatus } from '@/types/device'
import { EllipsisVertical } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DeleteItem } from './delete-column'
import { UseAuth } from '@/providers/auth.provider'
import { ROLE } from '@/types/role'

export function EditColumns({ data }: { data: device }) {
    const [StateDrop, setStateDrop] = useState<boolean>(false)
    const { id, status: statusDevice } = data
    const STATUS = Object.values(deviceStatus)

    const Role = UseAuth().profile?.role

    // Close dropdown
    function closeDrop() {
        setStateDrop(false)
    }

    return (
        <DropdownMenu open={StateDrop} onOpenChange={setStateDrop}>
            <DropdownMenuTrigger asChild>
                <Button size={'icon'} variant={'ghost'}>
                    <EllipsisVertical className="w-5 h-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link to={`${id}`}>Editar</Link>
                    </DropdownMenuItem>
                    {Role === ROLE.ADMIN && (
                        <DeleteItem id={id} close={closeDrop} />
                    )}

                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            Exportar
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem>Excel</DropdownMenuItem>
                            <DropdownMenuItem>PDF</DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Estado</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                {STATUS.map((status) => (
                                    <DropdownMenuCheckboxItem
                                        key={status}
                                        checked={status === statusDevice}
                                    >
                                        {status}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
