import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TitleBar } from '../header/title-bar'
import { Storage } from '@/types/device'

interface StorageProps {
    storage: Storage[] | null
}

export default function StorageItem({ storage }: StorageProps) {
    6
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <TitleBar title="Almacenamiento" />
                </CardTitle>
            </CardHeader>
            <CardContent>hola</CardContent>
        </Card>
    )
}
