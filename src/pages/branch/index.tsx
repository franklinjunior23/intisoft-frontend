import { Outlet, useLocation } from 'react-router-dom'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link } from 'react-router-dom'
import { useStateArea } from './inventory/state/state-area'
import { useEffect } from 'react'
import { LocalStorageState } from '@/states/localstorage.state'
import { InstanceAxios } from '@/helper/axios-config'

export function PageBranch() {
    const { pathname } = useLocation()

    const { branch } = LocalStorageState()
    const path = pathname.split('/')[3]

    useEffect(() => {
        async function GetAreas() {
            const { data } = await InstanceAxios.get(
                `area?branchId=${localStorage.getItem('branchId')}`
            )
            setArea(data.data)
        }
        GetAreas()
    }, [branch])

    const { setArea } = useStateArea()

    return (
        <div>
            <Tabs defaultValue={path ?? 'usuarios'} className="w-[400px]">
                <TabsList>
                    <TabsTrigger asChild value="usuarios">
                        <Link to={'usuarios'}>Usuarios</Link>
                    </TabsTrigger>
                    <TabsTrigger value="dispositivos" asChild>
                        <Link to={'dispositivos'}>Dispositivos</Link>
                    </TabsTrigger>
                </TabsList>
            </Tabs>
            <Outlet />
        </div>
    )
}
