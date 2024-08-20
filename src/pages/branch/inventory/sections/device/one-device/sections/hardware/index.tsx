import { deviceType } from '@/types/device'
import useDeviceStore from '../../hoock/iddevice-data'
import DesktopHardware from './desktop-hardware'

export function PageHardware() {
    const { data } = useDeviceStore()
    return (
        <>
            {data?.information.type ==
                (deviceType.DESKTOP ||
                    deviceType.LAPTOP ||
                    deviceType.SERVER) && <DesktopHardware />}
        </>
    )
}
