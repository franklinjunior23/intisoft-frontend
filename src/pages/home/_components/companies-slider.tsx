import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { GetCompanies } from '../action/company.service'
import { Badge } from '@/components/ui/badge'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import ItemCompany from './item-companie'
import { Button } from '@/components/ui/button'
import { PlusCircle, XCircle } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import FormCompany from './form-create-company'

export function CompanySlider() {
    const [filterCompany, setfilterCompany] = useState<string>('')
    const { isLoading, data, isError } = GetCompanies()

    function onchangeCompani(e: React.ChangeEvent<HTMLInputElement>) {
        setfilterCompany(e.target.value)
    }

    if (isLoading)
        return (
            <div className="">
                <header className="flex justify-between items-end">
                    <Skeleton className="w-[200px] h-8" />
                    <Skeleton className="w-[90px] h-4" />
                </header>
                <main className="mt-4">
                    <Carousel>
                        <CarouselContent className="gap-3 sm:px-4 h-[150px]">
                            <Skeleton className="md:w-[360px]   md:max-w-[360px]  md:min-w-[360px]" />
                            <Skeleton className="md:w-[360px]   md:max-w-[360px]  md:min-w-[360px]" />
                            <Skeleton className="md:w-[360px]   md:max-w-[360px]  md:min-w-[360px]" />
                            <Skeleton className="md:w-[360px]   md:max-w-[360px]  md:min-w-[360px]" />
                        </CarouselContent>
                        <CarouselPrevious className="md:left-0 invisible md:visible" />
                        <CarouselNext className="md:right-0 invisible md:visible" />
                    </Carousel>
                </main>
            </div>
        )
    if (isError) return <div>Error</div>

    return (
        <div>
            <header className="mb-4 flex  flex-col-reverse md:flex-row justify-start  items-start md:items-center md:justify-between w-full gap-2">
                <div className="flex items-center gap-2 w-full md:w-fit">
                    <Input
                        className=" w-[100%] md:max-w-[200px]"
                        placeholder="Buscar Empresa"
                        value={filterCompany}
                        onChange={onchangeCompani}
                    />
                    {filterCompany !== '' && (
                        <Button
                            variant={'destructive'}
                            size={'icon'}
                            onClick={() => setfilterCompany('')}
                        >
                            <XCircle className="w-5 h-5" />
                        </Button>
                    )}
                </div>
                <div className="flex w-full justify-between items-end md:block md:w-fit">
                    <Badge>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    Empresas: {data?.meta.quantity}
                                </TooltipTrigger>
                                <TooltipContent>
                                    Empresas: {data?.meta.quantity}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Badge>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button size={'icon'} className="ml-2">
                                <PlusCircle className="w-4 h-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="end">
                            <FormCompany />
                        </PopoverContent>
                    </Popover>
                </div>
            </header>
            <article>
                <Carousel>
                    <CarouselContent className="gap-3 sm:px-4 h-[150px]">
                        {filterCompany === '' &&
                            data?.data.map((company) => (
                                <ItemCompany key={company.id} {...company} />
                            ))}
                        {filterCompany !== '' &&
                            data?.data
                                .filter((company) =>
                                    company.name
                                        .toLowerCase()
                                        .includes(filterCompany.toLowerCase())
                                )
                                .map((company) => (
                                    <ItemCompany
                                        key={company.id}
                                        {...company}
                                    />
                                ))}
                        {data?.data.length === 0 && (
                            <div className="text-center">
                                No se encontraron empresas
                            </div>
                        )}
                    </CarouselContent>
                    <CarouselPrevious className="md:left-0 hidden md:flex" />
                    <CarouselNext className="md:right-0 hidden md:flex" />
                </Carousel>
            </article>
        </div>
    )
}
