import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { device } from '@/types/device'
import { TitleBar } from '../../_ components/header/title-bar'
import { Eye, Printer } from 'lucide-react'
import { StatusDevice } from '../../../_components/columns/status-state'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import VinculeDevice from '../../_ components/vincule-device'
import SoporteRegistre from '../../_ components/soporte-device'
import AreaVincule from '../../_ components/vincule/area'
import PcPrintVincule from '../../_ components/vincule/pc-print'

export default function PrintResume({ data }: { data: device }) {
    const [ViewUsers, setViewUsers] = useState<boolean>(false)
    return (
        <main className="grid gap-3 md:grid-cols-[40%_300px_1fr]">
            <div>
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>
                                <TitleBar title="Informacion Tecnica" />
                            </CardTitle>
                            <span className="text-sm dark:text-gray-300">
                                {new Date(
                                    data.dateCreated
                                ).toLocaleDateString()}
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex gap-20  items-center">
                        <div className="">
                            <Printer className="w-20 h-20  mx-auto" />
                            <div className="mt-4 text-sm">
                                <StatusDevice status={data.status} />
                            </div>
                        </div>

                        <div>
                            <p>
                                <span>Tipo: </span> {data.information.type}
                            </p>
                            <p>
                                <span>Dispositivo: </span>
                                {data.information.typeDevice}
                            </p>
                            <p>
                                <span>Marca: </span> {data.information.brand}
                            </p>
                            <p>
                                <span>Modelo: </span> {data.information.model}
                            </p>
                            <p>
                                <span>Serial: </span>{' '}
                                {data.information.serialNumber}
                            </p>
                            <p>
                                <span>Serial: </span>{' '}
                                {data.information.serialNumber}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <div className="flex gap-3 mt-3">
                    <Card className=" h-[200px] w-[60%]">
                        <CardHeader>
                            <CardTitle>
                                <TitleBar title="Usuarios" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-2 h-full overflow-y-auto">
                                {data.details?.accounts?.map(
                                    (account, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center"
                                        >
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-lg">
                                                        {account.name}
                                                    </h3>
                                                    <span className="text-sm  font-medium dark:text-gray-400">
                                                        {account.role}
                                                    </span>
                                                </div>
                                                <div className="text-sm mt-2">
                                                    <p>
                                                        user :
                                                        {ViewUsers
                                                            ? account.user
                                                            : '*******'}
                                                    </p>
                                                    <p>
                                                        contraseña :
                                                        {ViewUsers
                                                            ? account.password
                                                            : '*******'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <Button
                                                    size={'icon'}
                                                    variant={'ghost'}
                                                    onClick={() => {
                                                        setViewUsers(!ViewUsers)
                                                    }}
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-[40%]">
                        <CardHeader>
                            <CardTitle>
                                <TitleBar title="IP" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-2 h-full overflow-y-auto">
                                {data.details?.network?.map((note, index) => (
                                    <div key={index} className="text-sm">
                                        <h3>{note.name}</h3>
                                        <p>ip4 : {note.ip4}</p>
                                        <p>ip6 : {note.ip6}</p>
                                        <p>
                                            mac :{' '}
                                            {note.mac ?? 'no registrado --'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <AreaVincule area={data?.area} />
                <PcPrintVincule parentDevice={data?.parentDevice} />
            </div>
            <div>
                <SoporteRegistre support={null} />
            </div>
        </main>
    )
}
