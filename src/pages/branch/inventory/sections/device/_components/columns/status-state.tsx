import { cn } from '@/lib/utils'
import { deviceStatus } from '@/types/device'

export function StatusDevice({ status }: { status: deviceStatus }) {
    const statusColor = {
        [deviceStatus.ACTIVE]:
            'bg-green-100 text-green-600 dark:border dark:border-green-600',
        [deviceStatus.INACTIVE]:
            'bg-red-200 text-red-600 dark:border-red-600 dark:border',
        [deviceStatus.DISREPAIR]: 'bg-yellow-500',
        [deviceStatus.INREPAIR]: 'bg-blue-500',
        [deviceStatus.INMANTENANCE]: 'bg-purple-500',
        error: 'bg-red-200 text-red-600 dark:border-red-600 dark:border',
    }

    const stateStatus = statusColor[status] ?? statusColor.error

    return (
        <div
            className={cn(
                'w-[160px] text-center dark:bg-transparent rounded-lg px-2',
                stateStatus
            )}
        >
            {status ?? 'Estado Erroneo'}
        </div>
    )
}
