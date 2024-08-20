import { DataTable } from '@/components/shared/table'
import { useEffect } from 'react'
import { columns } from './_components/column'
import { useFetchData } from '@/helper/usefect-state'
import { UsersLoged } from '@/types/users-loged'

export default function PageUserSytem() {
    const { data, isLoading } = useFetchData<UsersLoged[]>('auth')

    useEffect(() => {
        const idBreadcrum = document.getElementById('breadcrumId')
        if (idBreadcrum) {
            idBreadcrum.innerText = 'Usuarios'
        }
    }, [])

    if (isLoading) return <div>Cargando...</div>
    return (
        <div>
            <DataTable
                columns={columns}
                data={data || []}
                filterColumn={{
                    column: 'nameLastName',
                    placeholder: 'Buscar por nombre',
                }}
            />
        </div>
    )
}
