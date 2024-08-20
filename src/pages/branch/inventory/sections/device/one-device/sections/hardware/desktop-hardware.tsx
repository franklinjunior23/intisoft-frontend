import { Cpu, motherboard, Ram } from '@/types/device'
import MotherboardItem from '../../_ components/device-items/motherboard'
import useDeviceStore from '../../hoock/iddevice-data'
import CpuItem from '../../_ components/device-items/cpu'
import RamItem from '../../_ components/device-items/ram'

export default function DesktopHardware() {
    const { data } = useDeviceStore()
    console.log(data?.details)
    return (
        <main className=" flex gap-5">
            <div className="flex w-full md:w-fit flex-col gap-5">
                <MotherboardItem
                    {...(data?.details.motherboard as motherboard)}
                />
                <CpuItem {...(data?.details.cpu as Cpu)} />
            </div>
            <RamItem ram={data?.details.ram as Ram[]} />
        </main>
    )
}
