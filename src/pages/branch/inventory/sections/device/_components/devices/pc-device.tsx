import { SchemaDevice } from '@/pages/branch/inventory/validate/device-validate'
import { Control } from 'react-hook-form'
import { z } from 'zod'
import { AnydeskItem } from '../form/anydesk-item'
import { MotherboardItem } from '../form/motherboard-item'
import { OsItem } from '../form/os-item'
import { CpuItem } from '../form/cpu-item'
import { GpuItem } from '../form/gpu-item'
import { RamItem } from '../form/ram-item'
import { StorageItem } from '../form/storage-item'

interface PcDeviceProps {
    control: Control<z.infer<typeof SchemaDevice>>
    watch: object
}
export function PcDevice({ control, watch }: PcDeviceProps) {
    return (
        <>
            <div className="grid grid-cols-3 gap-3 mt-2">
                <OsItem control={control} />
                <div>
                    <MotherboardItem control={control} />
                </div>
                <div>
                    <CpuItem control={control} />
                    <AnydeskItem control={control} />
                </div>
            </div>
            <footer className="grid grid-cols-3 gap-4">
                <GpuItem control={control} watch={watch} />
                <RamItem control={control} />
                <StorageItem control={control} />
            </footer>
        </>
    )
}
