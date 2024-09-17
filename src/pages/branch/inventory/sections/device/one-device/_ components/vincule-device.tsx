import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TitleBar } from './header/title-bar'
import { User } from 'lucide-react'
import { Truncate } from '@/helper/truncate-text'
import React from 'react'
import { DeviceInformation } from '@/types/device'
import PcPrintVincule from './vincule/pc-print'
import AreaVincule from './vincule/area'

interface VinculeDeviceProps {
    user: {
        id: string
        name: string
        lastName: string
    } | null
    area: {
        id: string
        name: string
    } | null
    parentDevice: DeviceInformation | null
}
export default function VinculeDevice({
    user,
    area,
    parentDevice,
}: VinculeDeviceProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <TitleBar title="Vinculado" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] overflow-y-auto flex flex-col gap-1.5">
                    {parentDevice && (
                        <PcPrintVincule parentDevice={parentDevice} />
                    )}
                    {user && (
                        <ItemView
                            name={'Usuario'}
                            icon={<User className="w-6 h-6 mx-auto" />}
                            title="Usuario"
                            content={`${user.name} ${user.lastName}`}
                            maxLength={15}
                        />
                    )}
                    {area && <AreaVincule area={area} />}

                    {!user && !area && !parentDevice && (
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
    name
}

function ItemView({
    icon,
    title,
    content,
    maxLength = null,
    name,
}: ItemViewProps) {
    return (
        <div>
            <div className="p-3 px-5 grid grid-cols-[25px_1fr] items-center border rounded-lg gap-4">
                {icon}
                <div>
                    <h4 className="font-medium">
                        {name}{' '}
                        <span className="ml-2 text-sm text-slate-500">
                            {title}
                        </span>
                    </h4>
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
