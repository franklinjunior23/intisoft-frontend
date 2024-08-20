import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { TitleBar } from '../header/title-bar'

export default function AnydekItem() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <TitleBar title="Anydesk" />
                </CardTitle>
            </CardHeader>
        </Card>
    )
}
