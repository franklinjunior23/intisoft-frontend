import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { deviceType } from '@/types/device'
import { Link, useLocation } from 'react-router-dom'

export default function HeaderDevice({ type }: { type: deviceType }) {
    const { pathname } = useLocation()
    const pathMoment = pathname.split('/')
    let resumePath: string | string[] = pathname.split('/')
    resumePath.pop()
    resumePath = resumePath.join('/')

    return (
        <div className="mt-3 mb-3">
            <Tabs defaultValue={String(pathMoment[6])} className="w-[400px]">
                <TabsList>
                    <TabsTrigger asChild value="undefined">
                        <Link to={resumePath}>Resumen</Link>
                    </TabsTrigger>
                    {type ==
                        (deviceType.DESKTOP ||
                            deviceType.LAPTOP ||
                            deviceType.SERVER)}
                    <TabsTrigger value="hardware" asChild>
                        <Link to={'hardware'}>Hardware</Link>
                    </TabsTrigger>
                    <TabsTrigger value="registro-soportes" asChild>
                        <Link to={'registro-soportes'}>Soporte</Link>
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    )
}

const headerDesktop = [
    {
        pathname: '',
        value: 'Hardware',
        label: 'Hardware',
    },
]
