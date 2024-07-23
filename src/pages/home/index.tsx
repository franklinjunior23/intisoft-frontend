import { Calendar } from '@/components/ui/calendar'
import { CompanySlider } from './_components/companies-slider'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import CompanyQuantity from '@/components/shared/chart/company'

function PageHome() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
        <div className="">
            <div className="md:flex justify-between flex-shrink h-[205px] gap-5">
                <header className="md:w-[73%]">
                    <CompanySlider />
                </header>

                <Card className="h-full w-[25%] ">
                    <CardContent className="">
                        <CompanyQuantity />
                    </CardContent>
                </Card>
            </div>
            <div className="w-fit mt-5">
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
