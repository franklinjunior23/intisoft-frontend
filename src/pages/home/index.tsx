import { Calendar } from '@/components/ui/calendar'
import { CompanySlider } from './_components/companies-slider'
import { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import CompanyQuantity from '@/components/shared/chart/company'

function PageHome() {
    const [selected, setSelected] = useState<Date>()
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
        <div className="">
            <div className="md:flex justify-between flex-shrink h-[260px]">
                <header className="md:w-[70%]">
                    <CompanySlider />
                </header>

                <Card className="h-full ">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Empresas registradas</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <CompanyQuantity />
                    </CardContent>
                </Card>
            </div>
            <div className="w-fit">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className=" border rounded-xl h-full"
                />
            </div>
        </div>
    )
}

export default PageHome
