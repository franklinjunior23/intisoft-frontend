import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Link, useLocation } from 'react-router-dom'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDownIcon } from 'lucide-react'

function BreadCrum() {
    const { pathname } = useLocation()

    // Dividimos la ruta actual en segmentos, eliminando cualquier cadena vacía
    const params: string[] = pathname.split('/').filter(Boolean)

    // Definimos un tipo para el acumulador
    interface Accumulator {
        list: string[]
        stop: boolean
    }

    // Creamos una nueva lista de parámetros que se detendrá después de "dispositivos/{un valor}"
    const filteredParams: string[] = params.reduce<Accumulator>(
        (acc: Accumulator, param: string, index: number) => {
            // Si ya hemos encontrado "dispositivos", dejamos de agregar más parámetros
            if (acc.stop) return acc

            // Agregamos el parámetro actual a la lista
            acc.list.push(param)

            // Si encontramos "dispositivos", también agregamos el siguiente parámetro y detenemos el bucle
            if (param === 'dispositivos') {
                if (params[index + 1]) {
                    acc.list.push(params[index + 1])
                }
                acc.stop = true
            }

            return acc
        },
        { list: [], stop: false } // Valor inicial para el acumulador
    ).list

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem key="home">
                        <BreadcrumbLink asChild>
                            <Link to="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {filteredParams.map((item, index) => {
                        const isLast = index === filteredParams.length - 1
                        const href = `/${filteredParams.slice(0, index + 1).join('/')}`
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
                                    <BreadcrumbPage>
                                        {decodeURIComponent(item)}
                                    </BreadcrumbPage>
                                ) : isDropdown ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="flex items-center gap-2">
                                            {decodeURIComponent(item)}
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
                                        <Link to={href}>
                                            {decodeURIComponent(item)}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        )
                    })}
                </BreadcrumbList>
            </Breadcrumb>
            <h2
                className="text-xl mt-2 font-medium capitalize"
                id="breadcrumId"
            >
                {pathname === '/'
                    ? 'Home'
                    : decodeURIComponent(
                          filteredParams[filteredParams.length - 1]
                      )}
            </h2>
        </>
    )
}

export default BreadCrum
