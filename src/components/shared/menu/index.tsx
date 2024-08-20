import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

function MenuItem() {
    return (
        <Button className="" size={'icon'} variant={'secondary'}>
            <Menu className="w-5 h-5" />
        </Button>
    )
}

export default MenuItem
