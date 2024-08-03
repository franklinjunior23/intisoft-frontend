import { DataTable } from '@/components/shared/table'
import { Badge } from '@/components/ui/badge'
import { GetDevice } from '@/pages/branch/action/device-actiion.service'
import { columns } from './_components/columns/columns'

function PageDevices() {
    const { data, isLoading, isError, error } = GetDevice()
    if (isLoading) return <div>Cargando ...</div>
    if (isError) return <div>Sucedio un error {error.message}</div>

    console.log(data)
    return (
        <DataTable
            filterColumn={{
                column: 'name',
                placeholder: 'Search by name',
            }}
            data={data?.data || []}
            columns={columns}
            childrenTab={
                <>
                    <Badge>Dispositivos: {data?.meta.quantity}</Badge>
                    
                </>
            }
        />
    )
}

export default PageDevices
