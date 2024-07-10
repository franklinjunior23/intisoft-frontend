import { UseAuth } from '@/providers/auth.provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function AvatarUser() {
    const { profile, logout } = UseAuth()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage
                        src={`https://ui-avatars.com/api/?name=${profile?.name}+${profile?.lastName}&rounded=true&format=svg&font-size=0.4`}
                        className=" w-[50px] "
                        alt="USER"
                    />
                    <AvatarFallback>
                        <Skeleton className="w-2  h-2 rounded-full" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                    Cerrar Sesion
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
