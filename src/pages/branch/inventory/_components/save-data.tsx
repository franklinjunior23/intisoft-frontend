import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import React, { useEffect, useState } from 'react'

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
    const [stateOpen, setstateOpen] = useState<boolean>(() => {
        return localStorage.getItem(keyUpdate) ? true : false
    })

    useEffect(() => {
        const updateState = () => {
            setstateOpen(localStorage.getItem(keyUpdate) !== null)
        }

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === keyUpdate) {
                updateState()
            }
        }

        window.addEventListener('storage', handleStorageChange)

        const originalSetItem = localStorage.setItem
        localStorage.setItem = function (key) {
            originalSetItem.apply(this, arguments)
            if (key === keyUpdate) updateState()
        }

        const originalRemoveItem = localStorage.removeItem
        localStorage.removeItem = function (key) {
            originalRemoveItem.apply(this, arguments)
            if (key === keyUpdate) updateState()
        }

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            localStorage.setItem = originalSetItem
            localStorage.removeItem = originalRemoveItem
        }
    }, [keyUpdate])

    return (
        stateOpen && (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>{children}</TooltipTrigger>
                    <TooltipContent align="end">{TooltipDetail}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    )
}
