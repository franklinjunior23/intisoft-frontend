    import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { Time_year } from '@/helper/time/transform-date'
import { cn } from '@/lib/utils'
import { StatusUser, user } from '@/types/users'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'
import { PersonStanding } from 'lucide-react'
import { EditUser } from './edit-user'

export const columns: ColumnDef<user>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'name',
        header: 'Nombre',
        accessorKey: 'name',
        accessorFn: (row) => row.name + '' + row.lastName,
        cell: ({ row }) => {
            return <div className="">{row.original.name}</div>
        },
        enableHiding: false,
    },
    {
        id: 'lastName',
        header: 'Apellido',
        accessorKey: 'lastName',
        enableHiding: false,
    },
    {
        id: 'gender',
        accessorKey: 'gender',
        header: ({ column }) => {
            return (
                <Button
                    variant={'ghost'}
                    className=""
                    onClick={() => {
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }}
                >
                    Genero
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="w-fit mx-10 md:mx-10 ">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div
                                className={cn(
                                    'flex items-center w-fit rounded-full p-1 ',
                                    {
                                        'bg-blue-500': row.original.gender,
                                        'bg-pink-500': !row.original.gender,
                                    }
                                )}
                            >
                                <PersonStanding className="w-5 h-5 text-white" />{' '}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            {row.original.gender ? 'Masculino' : 'Femenino'}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        ),
    },
    {
        id: 'status',
        accessorKey: 'status',
        header: ({ column }) => {
            return (
                <Button
                    variant={'ghost'}
                    className=""
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Estado
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div
                className={cn(
                    ' w-[100px] text-center rounded-lg px-2 ',
                    {
                        'bg-green-100 text-green-600 dark:bg-transparent dark:border dark:border-green-600':
                            row.original.status === StatusUser.ACTIVE,
                        'bg-red-100 text-red-600 dark:bg-transparent dark:border-red-600 dark:border':
                            row.original.status === StatusUser.RETIRED,
                        'bg-yellow-100 text-yellow-600 dark:bg-transparent dark:border dark:border-yellow-600 ':
                            row.original.status === StatusUser.PROCES,
                    }
                )}
            >
                {row.original.status}
            </div>
        ),
    },
    {
        id: 'deviceUser',
        accessorKey: 'device',
        header: ({ column }) => (
            <Button
                variant={'ghost'}
                className="px-0"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Dispositivo
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div className="">
                                {row.original.device?.name ?? 'Sin Dispositivo'}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            {row.original.device?.name ?? 'Sin Dispositivo'}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        ),
    },
    {
        id: 'areaUser',
        accessorKey: 'area',
        header: () => <span className="w-fit mx-auto">Area</span>,
        cell: ({ row }) => (
            <div >
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div>
                                {row.original.area?.name ?? 'Sin Area'}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            {row.original.area?.name ?? 'Sin Area'}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        ),
    },
    {
        id: 'createdAt',
        header: 'Fecha de registro',
        cell: ({ row }) => (
            <div className="text-xs">{Time_year(row.original.createdAt)}</div>
        ),
    },
    {
        id: 'actions',
        header: '',
        cell: ({ row }) => <EditUser data={row.original} />,
        enableSorting: false,
        enableHiding: false,
    },
]
