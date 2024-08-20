import { ChevronRight, Settings } from 'lucide-react'
import Notification from '../notification'
import { AvatarUser } from './_components/avatar-user'
import MenuItem from '../menu'
import { Button } from '@/components/ui/button'
import { useNavbarStore } from '@/states/navbar.state'
import { cn } from '@/lib/utils'
import Paths from './_components/paths'
import { ToogleTheme } from '../theme'

export function Navbar() {
    const { toggleNavbar, isOpen } = useNavbarStore()

    return (
        <main className="flex flex-col h-full justify-between ">
            <header className="relative hidden md:block">
                <header className="flex p-1 px-3 border dark:border-none rounded-md justify-center items-center gap-3">
                    <img src="/intilogo.png" className="w-10" alt="" />
                    {isOpen && (
                        <h3 className="text-lg font-semibold">Intiscorp</h3>
                    )}
                </header>
                <Button
                    onClick={toggleNavbar}
                    size={'icon'}
                    variant={'secondary'}
                    className=" rounded-full md:flex md:absolute w-7 h-7 hidden -right-7 top-4"
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>
                <Paths />
            </header>

            <footer
                className={cn(
                    'md:flex justify-between  hidden  ',
                    isOpen
                        ? 'w-full items-end  '
                        : ' flex-col gap-5  items-center'
                )}
            >
                <div className="flex items-center flex-col gap-3">
                    <ToogleTheme />
                    <Settings />
                </div>
                <AvatarUser />
            </footer>
            <header className="md:hidden flex justify-between items-center">
                <MenuItem />
                <div className="flex gap-1 items-center">
                    <Notification />
                    <AvatarUser />
                </div>
            </header>
        </main>
    )
}
