import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TitleBar, TitleSection } from '../header/title-bar'
import { Ram } from '@/types/device'
import { MemoryStick } from 'lucide-react'

interface RamItemProps {
    ram: Ram[] | null
}

export default function RamItem({ ram }: RamItemProps) {
    return (
        <Card className="">
            <CardHeader>
                <CardTitle>
                    <TitleBar title="Modulos de ram" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <section className="flex flex-col gap-3 h-full overflow-y-auto">
                    {ram?.map((ram, index) => (
                        <div
                            key={index}
                            className="flex border rounded-lg py-2 items-center justify-around"
                        >
                            <MemoryStick
                                strokeWidth={1.1}
                                className="w-16 h-20 "
                            />
                            <div className="flex flex-col w-[50%] md:w-[30%]">
                                <div className="grid grid-cols-[50px_50px] justify-between">
                                    <div>
                                        <TitleSection title="Marca" />
                                        <span>{ram.brand}</span>
                                    </div>
                                    <div>
                                        <TitleSection title="Tipo" />
                                        <span>{ram.type}</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-[50px_50px] mt-2 justify-between">
                                    <div>
                                        <TitleSection title="Modelo" />
                                        <span>{ram.model}</span>
                                    </div>
                                    <div>
                                        <TitleSection title="Gb" />
                                        <span>{ram.capacity}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {ram?.length == 0 || !ram ? (
                        <span>No hay modulos de ram</span>
                    ) : null}
                </section>
            </CardContent>
        </Card>
    )
}
