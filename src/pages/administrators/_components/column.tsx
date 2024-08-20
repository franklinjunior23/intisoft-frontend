import { Checkbox } from '@/components/ui/checkbox'
import { UsersLoged } from '@/types/users-loged'
import { ColumnDef } from '@tanstack/react-table'

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
            return <div className="border">{row.original.role.name}</div>
        },
    },
]
