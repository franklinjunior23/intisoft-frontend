import { Truncate } from '@/helper/truncate-text'
import { DeviceInformation, deviceStatus, deviceType } from '@/types/device'
import { MonitorSmartphone, Printer } from 'lucide-react'
import { StatusDevice } from '../../../_components/columns/status-state'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface PcPrintVinculeProps {
    parentDevice: DeviceInformation | null
}

export default function PcPrintVincule({ parentDevice }: PcPrintVinculeProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Computadora Conectada</CardTitle>
            </CardHeader>
            <CardContent>
                {parentDevice && (
                    <section className="flex gap-4 px-1 items-center">
                        <div>
                            {parentDevice.information.type ==
                            deviceType.PRINTER ? (
                                <Printer className="w-7 h-7 mx-auto" />
                            ) : (
                                <MonitorSmartphone className="w-7 h-7" />
                            )}
                        </div>
                        <header className="w-full">
                            <h4 className="flex font-medium justify-between items-center w-full">
                                <Truncate
                                    text={parentDevice.name}
                                    maxlength={10}
                                />
                                <span className="text-sm">
                                    {parentDevice.information.type}
                                </span>
                            </h4>
                            <footer className="grid mt-1">
                                <span className="text-xs font-semibold">
                                    {parentDevice.codeDevice}
                                </span>
                                <span className="text-xs">
                                    {parentDevice.information.type} -
                                    {parentDevice.information.typeDevice}
                                </span>
                                <div className="mt-3">
                                    <StatusDevice
                                        status={
                                            parentDevice.status as deviceStatus
                                        }
                                    />
                                </div>
                            </footer>
                        </header>
                    </section>
                )}

                {!parentDevice && (
                    <section className="flex justify-center items-center py-2">
                        No tiene Computadora vinculada
                    </section>
                )}
            </CardContent>
        </Card>
    )
}
