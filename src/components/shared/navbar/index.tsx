import { Menu } from 'lucide-react'
import Notification from '../notification'
import { AvatarUser } from './_components/avatar-user'
import MenuItem from '../menu'
export function Navbar() {
    return (
        <>
            <header className="md:flex h-full flex-col justify-between hidden">
                <header className="flex p-1 px-3 border rounded-md items-center gap-3">
                    <img src="/intilogo.png" className="w-14" alt="" />
                    <h3 className="text-lg font-semibold">Intiscorp</h3>
                </header>
                <footer className="flex justify-between items-center">
                    config
                    <AvatarUser />
                </footer>
            </header>
            <header className="md:hidden flex justify-between items-center">
                <MenuItem />
                <div className="flex gap-1 items-center">
                    <Notification />
                    <AvatarUser />
                </div>
            </header>
        </>
    )
}
