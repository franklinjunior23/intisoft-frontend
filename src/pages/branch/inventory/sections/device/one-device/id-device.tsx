import { useFetchData } from '@/helper/usefect-state'
import { device, deviceType } from '@/types/device'

import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Laptop, MonitorSmartphone, Printer, Share2 } from 'lucide-react'
import HeaderDevice from './_ components/header/header'
import useDeviceStore from './hoock/iddevice-data'
import { StatusDevice } from '../_components/columns/status-state'

export default function DeviceOne() {
    const { setDevice } = useDeviceStore()
    const { idDevice } = useParams()
    const { pathname } = useLocation()
    const trimmedUrl = pathname.substring(0, pathname.lastIndexOf('/'))
    const navi = useNavigate()
    const { isLoading, data, isError, errorMessage } = useFetchData<device>(
        `device/${idDevice}`
    )

    const setTime = 1500

    useEffect(() => {
        if (data) {
            const idBreadcrum = document.getElementById('breadcrumId')
            if (idBreadcrum) {
                idBreadcrum.innerText = data.name
            }
        }
    }, [data])

    useEffect(() => {
        if (!data && isError) {
            const promise = () =>
                new Promise((resolve) =>
                    setTimeout(
                        () => resolve({ message: 'Redirrecionado exitoso' }),
                        setTime + 200
                    )
                )
            toast.error(errorMessage)
            toast.promise(promise, {
                loading: 'Redirrecionando...',
                success: 'Redirrecionado exitoso',
                error: 'Redirrecionado fallido',
            })
            const timer = setTimeout(() => {
                navi(trimmedUrl)
            }, setTime)
            return () => clearTimeout(timer)
        }
    }, [isError, errorMessage, data, navi, trimmedUrl])
    useEffect(() => {
        if (data && !isLoading) {
            setDevice(data)
        }
    }, [data, isLoading, setDevice])

    if (isLoading) return <div>Loading...</div>
    if (isError && !data) return <div>Error {errorMessage}</div>

    return (
        <>
            <Card>
                <CardContent className="py-2 flex justify-normal items-center gap-3">
                    <div>
                        {data?.information.type === deviceType.DESKTOP && (
                            <MonitorSmartphone className="w-12 h-12" />
                        )}
                        {data?.information.type === deviceType.SERVER && (
                            <MonitorSmartphone className="w-12 h-12" />
                        )}
                        {data?.information.type === deviceType.PRINTER && (
                            <Printer className="w-12 h-12" />
                        )}
                        {data?.information.type === deviceType.RED && (
                            <Share2 className="w-12 h-12" />
                        )}
                        {data?.information.type === deviceType.LAPTOP && (
                            <Laptop className="w-12 h-12" />
                        )}
                    </div>
                    <main className=" w-full flex justify-between items-center">
                        <div>
                            <h3 className="text-">
                                {data?.name} - {data?.nickName}
                            </h3>
                            <h3 className="text-sm">{data?.codeDevice}</h3>
                        </div>
                        <div>
                            <StatusDevice status={data!.status} />
                        </div>
                    </main>
                </CardContent>
            </Card>
            <HeaderDevice type={data!.information.type!} />
            <Outlet />
        </>
    )
}
