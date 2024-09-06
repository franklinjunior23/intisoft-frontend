import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TitleBar, TitleSection } from '../_ components/header/title-bar'
import { Download, FileText, Server } from 'lucide-react'
import Windows from '@/components/icons/so/windows-icon'
import { Truncate } from '@/helper/truncate-text'
import { Button } from '@/components/ui/button'
import { FitchDevice } from '../data/documents'
import useDeviceStore from '../hoock/iddevice-data'
import { device, deviceType } from '@/types/device'
import PrintResume from './resume/print-resume'
import SoporteRegistre from '../_ components/soporte-device'
import AreaVincule from '../_ components/vincule/area'
import DeviceChildren from '../_ components/vincule/device-children'

export default function ResumenDevice() {
    const { data } = useDeviceStore()
    return (
        <main>
            {data?.information.type ===
                (deviceType.DESKTOP ||
                    deviceType.LAPTOP ||
                    deviceType.SERVER) && <DesktopResume data={data} />}
            {data?.information.type == deviceType.PRINTER && (
                <PrintResume data={data} />
            )}
        </main>
    )
}

export function DesktopResume({ data }: { data: device }) {
    return (
        <main className="grid gap-4 md:grid-cols-[45%_300px_1fr]">
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <TitleBar title="Sistema Operativo" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="">
                        <div>
                            <div className="flex  justify-start items-center gap-10 mt-3">
                                <Windows className="w-12 h-12 " />
                                <div>
                                    <h4 className="text-xs">
                                        {data.details.os?.platform}
                                    </h4>
                                    <span>
                                        {data.details.os?.distro ??
                                            'Windows No Registrado'}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-5 flex  gap-4 flex-wrap  justify-between">
                                <div>
                                    <TitleSection title="Version" />
                                    <span className="text-sm">
                                        {data.details.os?.build}
                                    </span>
                                </div>
                                <div>
                                    <TitleSection title="Arquitectura" />
                                    <span className="text-sm">
                                        {data.details.os?.architecture}
                                    </span>
                                </div>
                                <div>
                                    <TitleSection title="Kernel" />
                                    <span className="text-sm">
                                        {data.details.os?.release}
                                    </span>
                                </div>
                                <div>
                                    <TitleSection title="Serial" />
                                    <span className="text-sm">
                                        {data.details.os?.serial}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mt-3">
                    <CardHeader>
                        <CardTitle>
                            <TitleBar title="Resumen" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="">
                        <div className="grid grid-cols-3 gap-y-5 grid-rows-3 mt-1">
                            <div>
                                <TitleSection title="Tipo de Dispositivo" />
                                <span>{data.information.type}</span>
                            </div>
                            <div>
                                <TitleSection title="Tipo" />
                                <span>{data.information.typeDevice}</span>
                            </div>
                            <div>
                                <TitleSection title="Marca" />
                                <span>{data.information.brand}</span>
                            </div>
                            <div>
                                <TitleSection title="Model" />
                                <span>
                                    <Truncate
                                        text={data.information.model}
                                        maxlength={12}
                                    />
                                </span>
                            </div>
                            <div>
                                <TitleSection title="Cantidad de Ram" />
                                <span>{data.details.ram?.length} </span>
                            </div>
                            <div>
                                <TitleSection title="Ram" />
                                <span>
                                    {data.details.ram?.reduce(
                                        (total, current) =>
                                            total + Number(current.capacity),
                                        0
                                    )}{' '}
                                    gb
                                </span>
                            </div>
                            <div>
                                <TitleSection title="Procesador" />
                                <span>
                                    <Truncate
                                        text={`${data.details.cpu.brand}  - ${data.details.cpu.model}`}
                                        maxlength={10}
                                    />
                                </span>
                            </div>
                            <div>
                                <TitleSection title="Graficos" />
                                <span>
                                    <Truncate
                                        text={`${data.details?.graphic?.[0]?.brand} - ${data.details?.graphic?.[0]?.model}`}
                                        maxlength={10}
                                    />
                                </span>
                            </div>
                            <div>
                                <TitleSection title="Fecha de Fabricación" />
                                <span>
                                    {new Date(
                                        data.dateCreated
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mt-3">
                    <CardHeader>
                        <CardTitle>
                            <TitleBar title="Almacenamiento" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {data.details.storage?.map((item, index) => (
                                <div
                                    className="border rounded-md p-1.5 px-3 flex justify-between items-center gap-3"
                                    key={index}
                                >
                                    <Server className="w-7 h-7" />
                                    <div>
                                        <h4 className="text-xs">
                                            {item.type} - {item.brand}
                                        </h4>
                                        <span className="text-xs">
                                            {item.capacity} gb
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-col gap-4">
                <AreaVincule area={data?.area} />
                <DeviceChildren deviceChildren={data?.children} />
            </div>
            <div>
                <SoporteRegistre support={null} />

                <Card className="h-[220px] mt-3">
                    <CardHeader>
                        <CardTitle>
                            <TitleBar title="Documentos" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-1">
                            {FitchDevice.map((item, index) => (
                                <div
                                    className="grid grid-cols-[30px_1fr_40px] py-0.5 hover:bg-black/5 gap-1  items-center"
                                    key={index}
                                >
                                    <div>
                                        <FileText className="w-6 h-6 mx-auto" />
                                    </div>
                                    <h4 className="text-sm">{item.label}</h4>
                                    <div className="">
                                        <Button size={'icon'} variant={'ghost'}>
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
