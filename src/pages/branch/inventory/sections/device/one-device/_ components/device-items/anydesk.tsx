import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TitleBar } from '../header/title-bar'
import { AnydeskTypes } from '@/types/device'
import Anydesk from '@/components/icons/anydesk-icon'
import AnydeskIcon from '@/components/icons/anydesk-svgrepo-com.svg'

export default function AnydekItem({ id, password }: AnydeskTypes) {
    return (
        <Card>
            <CardHeader>
                <div className="flex  justify-between items-center">
                    <CardTitle>
                        <TitleBar title="Anydesk" />
                    </CardTitle>
                    <img src={AnydeskIcon} className="w-9" alt="" />
                </div>
            </CardHeader>
            <CardContent>
                {!id && !password ? (
                    <p>No se ha registrado Anydesk</p>
                ) : (
                    <div className="">
                        <p>ID: {id}</p>
                        {password && <p>Contraseña: {password}</p>}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
