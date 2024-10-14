import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Truncate } from '@/helper/truncate-text'
import { Network } from '@/types/device'

export default function NetworkItem({ network }: { network: Network[] }) {
    if (network.length === 0)
        return (
            <>
                <p>No se ha registrado red</p>
            </>
        )

    return (
        <>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Redes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-2">
                        {network.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="border p-3 rounded-md"
                                >
                                    <div className="flex justify-between items-start">
                                        <p>{item.name} </p>
                                    </div>
                                    <section className="mt-2 text-sm">
                                        <p>ip4 : {item.ip4}</p>
                                        <p>
                                            ip6 :
                                            {Truncate({
                                                text: item.ip6,
                                                maxlength: 23,
                                            })}
                                        </p>
                                    </section>
                                    <section className="text-sm">
                                        <p>
                                            isVirtual :
                                            {item.isVirtual ? 'true' : 'false'}
                                        </p>
                                        <p>
                                            isDhcp :
                                            {item.isDhcp ? 'true' : 'false'}
                                        </p>
                                    </section>
                                    <div className="flex justify-between text-sm mt-3">
                                        <p>{item.speed} mb</p>
                                        <p>{item.status}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
