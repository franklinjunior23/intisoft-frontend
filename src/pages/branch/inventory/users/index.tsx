import { GetUsers } from '../../action/users-action.service'
import { DataTable } from '@/components/shared/table'
import { columns } from './_components/columns'

function PageUsers() {
    const { isLoading, data, isError } = GetUsers()

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>

    return (
        <div>
            <span>{data?.meta.quantity} users</span>

            <DataTable
                filterColumn={{
                    column: 'name',
                    placeholder: 'Search by name',
                }}
                data={data?.data || []}
                columns={columns}
            />
        </div>
    )
}

export default PageUsers
