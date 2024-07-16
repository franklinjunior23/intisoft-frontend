import { EllipsisVertical } from 'lucide-react'
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
import { Link } from 'react-router-dom'
import { StatusUser } from '@/types/users'
interface UserData {
    data: {
        id: string
        status: StatusUser
    }
}

export function EditUser(data: UserData) {
    const { id, status: StatusOrigin } = data.data
    const STATUS = Object.values(StatusUser)
    return (
        <DropdownMenu>
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
                    <DropdownMenuItem>Eliminar</DropdownMenuItem>
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
                                        checked={status === StatusOrigin}
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
