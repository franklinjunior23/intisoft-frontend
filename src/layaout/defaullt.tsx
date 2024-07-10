import { Navbar } from '@/components/shared/navbar'
import { Outlet } from 'react-router-dom'

function Default() {
    return (
        <main className="w-dvw min-w-dvw">
            <nav className="md:fixed md:h-dvh bg-slate-50 shadow-md md:min-w-[260px] w-full md:w-[260px] p-3">
                <Navbar />
            </nav>
            <article className="md:ml-[280px] p-3">
                <Outlet />
            </article>
        </main>
    )
}

export default Default
