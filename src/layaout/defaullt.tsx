import BreadCrum from '@/components/shared/breadcum'
import { Navbar } from '@/components/shared/navbar'
import Notification from '@/components/shared/notification'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useNavbarStore } from '@/states/navbar.state'
import { Outlet } from 'react-router-dom'

function Default() {
    const { isOpen } = useNavbarStore()

    const widthToDiv = {
        nav: {
            open: ' md:min-w-[220px] w-full md:w-[220px]',
            close: 'md:min-w-[90px] w-full md:w-[90px]',
        },
        main: {
            open: 'md:ml-[260px] p-3',
            close: 'md:ml-[120px] p-3',
        },
    }

    return (
        <main className="w-full min-w-dvw max-w-[320px]:p-2">
            <Card
                className={cn(
                    'md:fixed transition-all md:h-dvh  bg-slate-50 dark:bg-inherit shadow-md  p-3',
                    isOpen ? widthToDiv.nav.open : widthToDiv.nav.close
                )}
            >
                <Navbar />
            </Card>
            <article
                className={cn(
                    'p-3',
                    isOpen ? widthToDiv.main.open : widthToDiv.main.close
                )}
            >
                <header className="mb-4 flex justify-between items-start">
                    <div>
                        <BreadCrum />
                    </div>
                    <div className="hidden md:block">
                        <Notification />
                    </div>
                </header>
                <Outlet />
            </article>
        </main>
    )
}

export default Default
