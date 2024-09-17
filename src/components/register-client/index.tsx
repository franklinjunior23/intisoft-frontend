import React, { useState } from 'react'
import Welcome from './pages/welcome'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import ProfilePage from './pages/profile'

export default function PageRegisterClient() {
    const [CountPage, setCountPage] = useState<number>(0)
    const [Width, setWidth] = useState<string>('')
    const StatesPages = [
        <Welcome setWidth={setWidth} />,
        <ProfilePage setWidth={setWidth} />,
    ]
    const width = 'w-[360px] h-[600px]  md:w-[800px] md:h-[700px]'
    return (
        <main className="fixed  top-0 left-0 w-screen h-dvh grid place-content-center max-h-screen backdrop-blur-sm z-50 p-10">
            <section
                className={cn('text-white p-12 rounded-lg bg-zinc-600', Width)}
            >
                {StatesPages[CountPage]}
                {CountPage === 0 && (
                    <ButtonCountPage
                        pageCount={CountPage}
                        setCount={setCountPage}
                    />
                )}
            </section>
        </main>
    )
}

function ButtonCountPage({
    pageCount,
    setCount,
}: {
    pageCount: number
    setCount: React.Dispatch<React.SetStateAction<number>>
}) {
    function AddPage() {
        setCount(pageCount + 1)
    }

    function DisminuesPage() {
        setCount(pageCount - 1)
    }
    return (
        <footer>
            {pageCount != 0 ? (
                <div className="w-full grid grid-cols-2 gap-5">
                    {pageCount > 1 && (
                        <Button onClick={DisminuesPage}>Retroceder</Button>
                    )}
                    <Button onClick={AddPage}>Siguiente</Button>
                </div>
            ) : (
                <div className="grid place-content-center">
                    <Button
                        className="  text-lg"
                        variant="default"
                        onClick={AddPage}
                    >
                        Getting Started !!!
                    </Button>
                </div>
            )}
        </footer>
    )
}
