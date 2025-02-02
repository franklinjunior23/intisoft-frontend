import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { device } from '@/types/device'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'
import { Time_year } from '@/helper/time/transform-date'
import { EditColumns } from './edit-columns'
import { StatusDevice } from './status-state'
import { Link } from 'react-router-dom'
import { Eye } from 'lucide-react'

export const columns: ColumnDef<device>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && true)
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
        id: 'codeDevice',
        header: 'Codigo',
        accessorKey: 'codeDevice',
    },
    {
        id: 'name',
        header: 'Nombre',
        accessorKey: 'name',
    },
    {
        id: 'nickname',
        header: 'Apodo',
        accessorKey: 'nickName',
    },
    {
        id: 'typedevice',
        header: 'Dispositivo',
        cell: ({ row }) => {
            const Row = row.original
            return (
                <div className="">
                    {Row.information.type} - {Row.information.typeDevice}
                </div>
            )
        },
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
        cell: ({ row }) => {
            const Row = row.original
            return <StatusDevice status={Row.status} />
        },
    },
    {
        id: 'area',
        header: 'Area',
        cell: ({ row }) => {
            const Row = row.original
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            {Row.area?.name ?? 'Sin Area'}
                        </TooltipTrigger>
                        <TooltipContent>
                            {Row.area?.name ?? 'Sin Area'}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )
        },
    },
    {
        id: 'user',
        header: 'Usuario',
        cell: ({ row }) => {
            const Row = row.original
            return <div className="">{Row.user?.name ?? 'Sin Usuario'}</div>
        },
    },
    {
        id: 'dateCreated',
        header: 'Fecha de Creación',
        cell: ({ row }) => {
            const Row = row.original
            return <div className="">{Time_year(Row.dateCreated)}</div>
        },
    },
    {
        id: 'actions',
        header: '',
        cell: ({ row }) => {
            return (
                <div className="flex justify-center items-center gap-2">
                    <Link
                        to={row.original.id}
                        className="dark:bg-white/20  bg-black p-2 rounded-lg"
                    >
                        <Eye className="w-4 h-4 text-white " />
                    </Link>
                    <EditColumns data={row.original} />
                </div>
            )
        },
    },
]
