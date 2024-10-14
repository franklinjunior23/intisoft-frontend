import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Cpu as CpuTypes } from '@/types/device'
import { TitleBar, TitleSection } from '../header/title-bar'
import { Cpu } from 'lucide-react'

export default function CpuItem({ brand, cores, model, threads }: CpuTypes) {
    return (
        <Card className=" w-full md:w-[400px]">
            <CardHeader>
                <CardTitle>
                    <TitleBar title="Procesador" />
                </CardTitle>
            </CardHeader>
            <CardContent className="flex  h-[65%] pb-12 justify-around items-center">
                <Cpu strokeWidth={1.1} className="w-16 h-20  md:mx-10" />
                <main className="flex flex-col  gap-1">
                    <div>
                        <TitleSection title="Modelo" />
                        <span>{model}</span>
                    </div>
                    <div>
                        <TitleSection title="Marca" />
                        <span>{brand}</span>
                    </div>
                    <div className="flex justify-between"></div>
                    <div className="flex justify-between  items-start">
                        <div className="w-1/2">
                            <TitleSection title="Nucleos" />
                            <span>{cores}</span>
                        </div>
                        <div className="w-1/2">
                            <TitleSection title="Hilos" />
                            <span>{threads}</span>
                        </div>
                    </div>
                </main>
            </CardContent>
        </Card>
    )
}
