import { DataTable } from '@/components/shared/table'
import { useEffect } from 'react'
import { columns } from './_components/column'

import { GetAdministrators } from './service/getAdministrators'
import AddUser from './_components/add-user'

export default function PageUserSytem() {

    const { data, isLoading } = GetAdministrators()

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
                childrenTab={
                    <>
                        <AddUser />
                    </>
                }
            />
        </div>
    )
}
