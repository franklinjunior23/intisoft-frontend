import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motherboard } from '@/types/device'
import { TitleBar, TitleSection } from '../header/title-bar'
import MotherboardIcon from '@/components/icons/device/motherboard-icon'

export default function MotherboardItem({
    brand,
    model,
    quantitySlots,
    socket,
}: motherboard) {
    return (
        <Card className=" w-full md:w-[400px]">
            <CardHeader>
                <CardTitle>
                    <TitleBar title="Placa Madre" />
                </CardTitle>
            </CardHeader>
            <CardContent className="flex  items-center">
                <MotherboardIcon className="w-20 h-20  mx-auto md:mx-10" />
                <main className="flex flex-col gap-2">
                    <div>
                        <TitleSection title="Marca" />
                        <span>{brand}</span>
                    </div>
                    <div>
                        <TitleSection title="Modelo" />
                        <span>{model}</span>
                    </div>
                    <div>
                        <TitleSection title="Tipo de Socket " />
                        <span>{socket ?? 'No disponible'}</span>
                    </div>
                    <div>
                        <TitleSection title="Cantidad de Ranuras Ram" />
                        <span>{quantitySlots ?? 'No disponible'}</span>
                    </div>
                </main>
            </CardContent>
        </Card>
    )
}
