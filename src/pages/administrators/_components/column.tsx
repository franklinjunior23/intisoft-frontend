import { Checkbox } from '@/components/ui/checkbox'
import { Time_year } from '@/helper/time/transform-date'
import { UsersLoged } from '@/types/users-loged'
import { ColumnDef } from '@tanstack/react-table'
import Action from './action'

export const columns: ColumnDef<UsersLoged>[] = [
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
        id: 'nameLastName',
        header: 'Nombre',
        accessorFn: (row) => `${row.name} ${row.lastName}`,
    },
    {
        id: 'email',
        header: 'Correo',
        accessorKey: 'email',
    },
    {
        id: 'role',
        header: 'Rol',
        cell: ({ row }) => {
            return (
                <div className="border py-1 px-2 rounded-lg w-[140px] text-center">
                    {row.original.role.name}
                </div>
            )
        },
    },
    {
        id: 'companyId',
        header: 'Empresa',
        cell: ({ row }) => {
            return (
                <div className="border py-1 px-2 rounded-lg w-[140px] text-center">
                    {row.original?.company?.name ?? '---------'}
                </div>
            )
        },
    },
    {
        id: 'creado',
        header: 'Creado',
        cell: ({ row }) => Time_year(row.original.createdAt),
    },
    {
        id: 'Acciones',
        header: '',
        cell: ({ row }) => {
            return <Action user={row.original ?? null} />
        },
    },
]
