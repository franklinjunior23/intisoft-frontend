import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TitleBar } from './header/title-bar'
import { MonitorSmartphone, Printer, Tag, User } from 'lucide-react'
import { Truncate } from '@/helper/truncate-text'
import React from 'react'
import { deviceType } from '@/types/device'

interface VinculeDeviceProps {
    user?: {
        id: string
        name: string
        lastName: string
    } | null
    area?: {
        id: string
        name: string
    } | null
    device?: {
        id: string
        name: string
        codeDevice: string
        status: string
        information: {
            type: deviceType
            typeDevice: string
        }
    } | null
}
export default function VinculeDevice({
    user,
    area,
    device,
}: VinculeDeviceProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <TitleBar title="Vinculado" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] overflow-y-auto flex flex-col gap-1">
                    {user && (
                        <ItemView
                            icon={<User className="w-6 h-6 mx-auto" />}
                            title="Usuario"
                            content={`${user.name} ${user.lastName}`}
                            maxLength={15}
                        />
                    )}
                    {area && (
                        <ItemView
                            icon={<Tag className="w-6 h-6 mx-auto" />}
                            title="Area"
                            content={area.name}
                            maxLength={15}
                        />
                    )}
                    {device && (
                        <ItemView
                            icon={
                                device.information.type ==
                                deviceType.PRINTER ? (
                                    <Printer className="w-5 h-5 mx-auto" />
                                ) : (
                                    <MonitorSmartphone className="w-5 h-5" />
                                )
                            }
                            title="Dispositivo"
                            content={`${device.information.type} - ${device.information.typeDevice}`}
                            maxLength={15}
                        />
                    )}

                    {!user && !area && !device && (
                        <div className="text-center dark:text-gray-400">
                            Sin vinculos
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

interface ItemViewProps {
    icon: React.ReactNode
    title: string
    content: string
    maxLength?: number | null
}

/**
 * 
 * @param param0  <div className="p-0.5 px-2 grid grid-cols-[25px_1fr] border rounded-lg items-center gap-4">
                                <Printer className="w-5 h-5 mx-auto" />
                                <div>
                                    <h4 className=" font-medium">Impresora</h4>
                                    <span className="text-sm">
                                        PC-SAND/LA V-731
                                    </span>
                                </div>
                            </div>
                            <div className="p-0.5  px-2 grid grid-cols-[25px_1fr] items-center border rounded-lg justify-between gap-4">
                                <MonitorSmartphone className="w-5 h-5" />
                                <div>
                                    <h4 className=" font-medium">Pc</h4>
                                    <span className="text-sm">
                                        PC-SAND/LA V-731
                                    </span>
                                </div>
                            </div>
 * @returns 
 */

function ItemView({ icon, title, content, maxLength = null }: ItemViewProps) {
    return (
        <div>
            <div className="p-0.5 px-2 grid grid-cols-[25px_1fr] items-center border rounded-lg gap-4">
                {icon}
                <div>
                    <h4 className="font-medium">{title}</h4>
                    <span className="text-sm">
                        {maxLength ? (
                            <Truncate text={content} maxlength={maxLength} />
                        ) : (
                            content
                        )}
                    </span>
                </div>
            </div>
        </div>
    )
}
