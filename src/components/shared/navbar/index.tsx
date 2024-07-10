import { AvatarUser } from './_components/avatar-user'
export function Navbar() {
    return (
        <header className="flex h-full flex-col justify-between">
            <header className="flex p-1 px-3 border rounded-md items-center gap-3">
                <img src="/intilogo.png" className="w-14" alt="" />
                <h3 className="text-lg font-semibold">Intiscorp</h3>
            </header>
            <footer className="flex justify-between items-center">
                config
                <AvatarUser />
            </footer>
        </header>
    )
}
