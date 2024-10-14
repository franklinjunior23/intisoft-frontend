import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Gpu } from '@/types/device'

export default function GraphicsItem({ gpu }: { gpu: Gpu[] }) {
    return (
        <Card className="md:w-[400px] h-[600px]">
            <CardHeader>
                <CardTitle>Graficos</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    {gpu.map((item, index) => {
                        return (
                            <div key={index} className="border p-3 rounded-md">
                                <div className="flex justify-between items-start">
                                    <p>{item.model}</p>
                                    <p className="text-sm"> {item.position}</p>
                                </div>
                                <div className="flex justify-between text-sm mt-3">
                                    <p>{item.brand}</p>
                                    <p>{item.vram} mb</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
