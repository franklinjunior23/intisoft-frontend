import { Card, CardContent } from '@/components/ui/card'
import { device } from '@/types/device'

interface PcSectionProps {
    data: device
}

export default function PcSection({ data }: PcSectionProps) {
    return (
        <div>
            <Card>
                <CardContent className="py-2">dw</CardContent>
            </Card>
        </div>
    )
}
