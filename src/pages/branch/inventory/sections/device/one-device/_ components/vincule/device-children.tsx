import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DeviceInformation } from '@/types/device'

interface DeviceChildrenProps {
    deviceChildren: DeviceInformation[] | []
}
export default function DeviceChildren({
    deviceChildren,
}: DeviceChildrenProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Dispositivos Hijos</CardTitle>
            </CardHeader>
            <CardContent>
                {deviceChildren?.map((device: DeviceInformation) => (
                    <div className="border p-1 rounded-lg" key={device.id}>
                        {device.name}
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
