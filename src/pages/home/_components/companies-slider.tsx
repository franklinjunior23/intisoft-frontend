import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { GetCompanies } from '../action/compani-service'

export function CompanySlider() {
    const { isLoading, data } = GetCompanies()
    if (isLoading) return <div>loading...</div>

    console.log(data)
    return (
        <div>
            <article>
                <Carousel>
                    <CarouselContent className="gap-3 sm:px-4 h-[150px]">
                        {data?.data.map((company) => (
                            <CarouselItem
                                key={company.id}
                                className="md:w-[360px]   md:max-w-[360px]  md:min-w-[360px]"
                            >
                                <div className=" p-4 rounded-xl bg-slate-400 h-full">
                                    <h1>{company.name}</h1>
                                    <p>{company.place}</p>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="md:left-0 hidden md:visible" />
                    <CarouselNext className="md:right-0 hidden md:visible" />
                </Carousel>
            </article>
        </div>
    )
}
