import BreadCrum from '@/components/shared/breadcum'
import { Navbar } from '@/components/shared/navbar'
import Notification from '@/components/shared/notification'
import { Outlet } from 'react-router-dom'

function Default() {
    return (
        <main className="w-full min-w-dvw max-w-[320px]:p-2">
            <nav className="md:fixed md:h-dvh bg-slate-50 shadow-md md:min-w-[260px] w-full md:w-[260px] p-3">
                <Navbar />
            </nav>
            <article className="md:ml-[280px] p-3">
                <header className="mb-4 flex justify-between items-center">
                    <div>
                        <BreadCrum />
                        <h2 className="text-lg font-medium">Home</h2>
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
