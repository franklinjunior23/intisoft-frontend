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
import { Building, ChevronDown, ChevronUp, Dot } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function ItemHref({
    icon,
    href,
    label,
    children,
    ifChildren,
    onclick,
}: routes) {
    const [OpenChildren, setOpenChildren] = useState<boolean>(false)
    const { pathname } = useLocation()
    const { isOpen } = useNavbarStore()
    const isHref = pathname === href
    const isLink = href ? true : false
    return (
        <>
            <div
                className={cn(
                    'px-3 py-3 rounded-lg  flex  items-center w-full relative text-sm',
                    isHref
                        ? 'bg-slate-200 dark:bg-slate-50/10 font-medium'
                        : 'hover:bg-slate-200/90 dark:hover:bg-slate-50/10',
                    !ifChildren && 'gap-2'
                )}
                onClick={() => children && setOpenChildren(!OpenChildren)}
            >
                <Link to={href!}> {icon}</Link>
                {ifChildren &&
                    (isOpen ? (
                        ifChildren && (
                            <Dot className={cn('w-5 h-5', isOpen && 'ml-2')} />
                        )
                    ) : (
                        <Building className="w-5 h-5" />
                    ))}
                <>
                    {isOpen &&
                        (isLink ? (
                            <Link
                                to={href!}
                                onClick={() =>
                                    ifChildren && onclick && onclick()
                                }
                            >
                                {label}
                            </Link>
                        ) : (
                            <>
                                <Link to={href!}>{label}</Link>
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
                <div className="flex mt-2 flex-col gap-2 w-full -p-2 justify-start ">
                    {children?.map((child, index) => {
                        return (
                            <TooltipProvider key={index}>
                                <Tooltip>
                                    <TooltipTrigger className="w-full">
                                        <ItemHref
                                            key={index}
                                            {...child}
                                            ifChildren={true}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        {child.label}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )
                    })}
                </div>
            )}
        </>
    )
}

export default function Paths() {
    const { isOpen } = useNavbarStore()
    const paths = RouteUser()
    const path = paths()

    return (
        <main
            className={cn(
                'mt-4 transition-all flex flex-col gap-1 w-full',
                !isOpen && 'grid place-content-center'
            )}
        >
            {path?.map((path, index) => {
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
