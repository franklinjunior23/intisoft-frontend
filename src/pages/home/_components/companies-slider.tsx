import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { Time_year } from '@/helper/time/transform-date'
import { Link } from 'react-router-dom'
import { GetCompanies } from '../action/company.service'
import { LocalStorageKeys } from '@/constants/localstorage-keys'

export function CompanySlider() {
    const { isLoading, data } = GetCompanies()
    if (isLoading) return <div>loading...</div>

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
                                    <Link
                                        to={company.name}
                                        onClick={() => {
                                            localStorage.setItem(
                                                LocalStorageKeys.company,
                                                company.id
                                            )
                                        }}
                                    >
                                        <h1 className="text-xl">
                                            {company.name}
                                        </h1>
                                    </Link>
                                    <span>{company.businessName}</span>
                                    <p>{company.place}</p>
                                    <p>
                                        created : {Time_year(company.createdAt)}
                                    </p>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="md:left-0 invisible md:visible" />
                    <CarouselNext className="md:right-0 invisible md:visible" />
                </Carousel>
            </article>
        </div>
    )
}
