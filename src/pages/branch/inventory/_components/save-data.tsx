import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

import React, { useEffect } from 'react'
interface SaveDataProps {
    keyUpdate: string
    children: React.ReactNode
    TooltipDetail: string | React.ReactNode
}

export function SaveData({
    keyUpdate,
    children,
    TooltipDetail,
}: SaveDataProps) {
    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key !== keyUpdate) return
            console.log(event.key)
        }

        window.addEventListener('storage', handleStorageChange)
        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [])
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent align="end">{TooltipDetail}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
