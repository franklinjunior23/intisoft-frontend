import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'
import React from 'react'

function Notification() {
    return (
        <Button variant={'secondary'} size={'icon'}>
            <Bell className="w-6 h-5 md:w-8 md:h-5" />
        </Button>
    )
}

export default Notification
