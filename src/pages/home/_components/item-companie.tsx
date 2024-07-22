import { CarouselItem } from '@/components/ui/carousel'
import { LocalStorageKeys } from '@/constants/localstorage-keys'
import { Truncate } from '@/helper/truncate-text'
import { company } from '@/types/company'
import { Link } from 'react-router-dom'

export default function ItemCompany({
    id,
    name,
    businessName,
    place,
}: company) {
    return (
        <CarouselItem className="md:w-[360px]   md:max-w-[360px]  md:min-w-[360px]">
            <div className=" p-4 rounded-xl bg-orange-200/50 h-full">
                <Link
                    to={name}
                    onClick={() => {
                        localStorage.setItem(LocalStorageKeys.company, id)
                    }}
                >
                    <h1 className="text-2xl font-bold">
                        <Truncate text={name} maxlength={20} />
                    </h1>
                </Link>
                <footer className="mt-10 text-sm grid">
                    <span>
                        <span className="font-semibold">Razon Social: </span>
                        <Truncate text={businessName} maxlength={20} />
                    </span>
                    <span>
                        <span className="font-semibold">Ubicación: </span>
                        {place}
                    </span>
                </footer>
            </div>
        </CarouselItem>
    )
}
