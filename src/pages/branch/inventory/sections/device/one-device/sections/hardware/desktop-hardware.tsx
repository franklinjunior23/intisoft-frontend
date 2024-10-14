import { Cpu, Gpu, motherboard, Network, Ram, Storage } from '@/types/device'
import MotherboardItem from '../../_ components/device-items/motherboard'
import useDeviceStore from '../../hoock/iddevice-data'
import CpuItem from '../../_ components/device-items/cpu'
import RamItem from '../../_ components/device-items/ram'
import StorageItem from '../../_ components/device-items/storage'
import AnydekItem from '../../_ components/device-items/anydesk'
import GraphicsItem from '../../_ components/device-items/graphics'
import NetworkItem from '../../_ components/device-items/network'

export default function DesktopHardware() {
    const { data } = useDeviceStore()
    return (
        <main className=" flex flex-col md:flex-row gap-5 w-full ">
            <div className="flex w-full md:w-fit flex-col gap-5">
                <MotherboardItem
                    {...(data?.details.motherboard as motherboard)}
                />
                <CpuItem {...(data?.details.cpu as Cpu)} />
                <AnydekItem
                    id={data?.anydesk?.id}
                    password={data?.anydesk?.password}
                />
            </div>
            <div className="flex flex-col gap-5 md:w-[500px]">
                <RamItem ram={data?.details.ram as Ram[]} />
                <StorageItem storage={data?.details.storage as Storage[]} />
            </div>
            <GraphicsItem gpu={data?.details.graphic as Gpu[]} />
            <NetworkItem network={data?.details.network as Network[]} />
        </main>
    )
}
