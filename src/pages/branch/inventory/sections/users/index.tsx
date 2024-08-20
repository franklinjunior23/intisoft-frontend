import { DataTable } from '@/components/shared/table'
import { columns } from './_components/columns'
import { Badge } from '@/components/ui/badge'
import AddUser from './_components/add-user'
import { GetUsers } from '@/pages/branch/action/users-action.service'

function PageUsers() {
    const { isLoading, data, isError } = GetUsers()

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>

    return (
        <div>
            <DataTable
                filterColumn={{
                    column: 'name',
                    placeholder: 'Search by name',
                }}
                data={data?.data || []}
                columns={columns}
                childrenTab={
                    <>
                        <Badge>Usuarios: {data?.meta.quantity}</Badge>
                        <AddUser />
                    </>
                }
            />
        </div>
    )
}

export default PageUsers
