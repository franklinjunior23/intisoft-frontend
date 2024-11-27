import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { CompanySlider } from './_components/companies-slider'
import { AuditList } from './_components/item-audit'
import { CalendarYear } from '@/components/ui/calendar-year'

function PageHome() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
        <div className="flex flex-shrink justify-between max-w-full gap-5 ">
            <div className="md:w-[71%]">
                <header className=" h-[205px] ">
                    <CompanySlider />
                </header>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className=" border rounded-xl w-fit mt-4"
                />
                <CalendarYear />
            </div>

            <div className="md:w-[27%]">
                <AuditList />
            </div>
        </div>
    )
}

export default PageHome
