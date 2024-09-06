import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { area } from '@/types/area'
import { Tag } from 'lucide-react'

interface AreaVinculeProps {
    area: area | null
}
export default function AreaVincule({ area }: AreaVinculeProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Area</CardTitle>
            </CardHeader>
            <CardContent>
                {area && (
                    <section className="flex gap-4 px-1 items-center justify-center">
                        <div>
                            <Tag className="w-6 h-6" />
                        </div>
                        <header>
                            <h4 className="font-semibold">{area.name}</h4>
                        </header>
                    </section>
                )}
                {!area && (
                    <section className="flex gap-4 px-1 items-center">
                        <h4>No esta registrada en una area</h4>
                    </section>
                )}
            </CardContent>
        </Card>
    )
}
