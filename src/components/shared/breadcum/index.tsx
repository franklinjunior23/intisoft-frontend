import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDownIcon } from 'lucide-react'

function BreadCrum() {
    const { pathname } = useLocation()
    const params = pathname.split('/').filter(Boolean)

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem key="home">
                    <BreadcrumbLink asChild>
                        <Link to={'/'}>Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {params.map((item, index) => {
                    const isLast = index === params.length - 1
                    const href = `/${params.slice(0, index + 1).join('/')}`
                    const pathInitial = pathname
                        .split('/')
                        .slice(0, 3)
                        .join('/')

                    const options = ['usuarios', 'dispositivos']

                    const isDropdown = options.includes(item)

                    return (
                        <BreadcrumbItem key={href}>
                            <BreadcrumbSeparator />
                            {isLast ? (
                                <BreadcrumbPage>{item} </BreadcrumbPage>
                            ) : isDropdown ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="flex items-center gap-2">
                                        {item}
                                        <ChevronDownIcon className="w-4 h-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="start"
                                        sideOffset={5}
                                        alignOffset={5}
                                    >
                                        <DropdownMenuItem>
                                            <Link
                                                to={`${pathInitial}/usuarios`}
                                            >
                                                Usuarios
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link
                                                to={`${pathInitial}/dispositivos`}
                                            >
                                                Dispositivos
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <BreadcrumbLink asChild>
                                    <Link to={href}>{item}</Link>
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreadCrum
