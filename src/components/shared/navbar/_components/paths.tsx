import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { RouteUser } from '@/routes'
import { useNavbarStore } from '@/states/navbar.state'
import { routes } from '@/types/routes'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function ItemHref({ icon, href, label, children }: routes) {
    const [OpenChildren, setOpenChildren] = useState<boolean>(false)
    const { pathname } = useLocation()
    const { isOpen } = useNavbarStore()
    const isHref = pathname === href
    const isLink = href ? true : false
    return (
        <>
            <div
                className={cn(
                    'px-3 py-3 rounded-lg flex gap-2 items-center w-full relative text-sm',
                    isHref
                        ? 'bg-slate-200 dark:bg-slate-50/20 font-semibold text-base'
                        : 'hover:bg-slate-200/90 dark:hover:bg-slate-50/10'
                )}
                onClick={() => setOpenChildren(!OpenChildren)}
            >
                {icon}
                <>
                    {isOpen &&
                        (isLink ? (
                            <Link to={href!}>{label}</Link>
                        ) : (
                            <>
                                <span>{label}</span>
                                {children &&
                                    (OpenChildren ? (
                                        <ChevronUp className="w-5 absolute right-2 h-5  transition-all" />
                                    ) : (
                                        <ChevronDown
                                            className={
                                                'w-5 absolute right-2 h-5 transition-all'
                                            }
                                        />
                                    ))}
                            </>
                        ))}
                </>
            </div>
            {OpenChildren && (
                <div className="flex flex-col gap-1 w-full">
                    {children?.map((child, index) => {
                        return <ItemHref key={index} {...child} />
                    })}
                </div>
            )}
        </>
    )
}

export default function Paths() {
    const { isOpen } = useNavbarStore()
    const paths = RouteUser()

    return (
        <main
            className={cn(
                'mt-4 transition-all flex flex-col gap-1 w-full',
                !isOpen && 'grid place-content-center'
            )}
        >
            {paths.map((path, index) => {
                return (
                    <TooltipProvider key={index}>
                        <Tooltip>
                            <TooltipTrigger className="w-full">
                                <ItemHref {...path} />
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                {path.label}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )
            })}
        </main>
    )
}
