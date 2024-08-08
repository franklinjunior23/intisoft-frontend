import { DataTable } from '@/components/shared/table'
import { Badge } from '@/components/ui/badge'
import { GetDevice } from '@/pages/branch/action/device-actiion.service'
import { columns } from './_components/columns/columns'
import { CreateDevice } from './_components/form/create-device'
import { LocalStorageKeys } from '@/constants/localstorage-keys'
import { Save } from 'lucide-react'
import { SaveData } from '../../_components/save-data'
import { SaveDevice } from './_components/save-data'

function PageDevices() {
    const { data, isLoading, isError, error } = GetDevice()
    if (isLoading) return <div>Cargando ...</div>
    if (isError) return <div>Sucedio un error {error.message}</div>

    return (
        <>
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
                        <CreateDevice />
                    </>
                }
            />

            <div className="fixed bottom-5 right-5 bg-yellow-600 p-2 rounded-full">
                <SaveData
                    keyUpdate={LocalStorageKeys.deviceStorage}
                    children={
                        <SaveDevice/>
                    }
                    TooltipDetail={'Tienes un registro guardado'}
                />
            </div>
        </>
    )
}

export default PageDevices
