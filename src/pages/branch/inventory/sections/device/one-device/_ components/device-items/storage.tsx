import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TitleBar } from '../header/title-bar'
import { Storage } from '@/types/device'

interface StorageProps {
    storage: Storage[] | null
}

export default function StorageItem({ storage }: StorageProps) {
    6
    return (
        <Card className="">
            <CardHeader>
                <CardTitle>
                    <TitleBar title="Almacenamiento" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    {storage.map((item, index) => {
                        const gb = item.capacity.toString()
                        const gborigin = gb.slice(0, 3)
                        return (
                            <div key={index} className="border p-3 rounded-md">
                                <p>{item.model}</p>
                                <div className="flex justify-between text-sm">
                                    <p>{item.brand}</p>
                                    <p>{item.type}</p>
                                </div>
                                <p className="mt-2">{gborigin} GB</p>
                            </div>
                        )
                    })}
                </div>

                {storage.length === 0 && (
                    <>
                        <p>No se ha registrado almacenamiento</p>
                    </>
                )}
            </CardContent>
        </Card>
    )
}
