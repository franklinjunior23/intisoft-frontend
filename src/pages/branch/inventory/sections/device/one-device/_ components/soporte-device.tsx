import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TitleBar } from './header/title-bar'

interface SoporteRegistreProps {
    support?: {
        id: string
        type: string
        title: string
        description: string
        createdAt: Date
    } | null
}
export default function SoporteRegistre({ support }: SoporteRegistreProps) {
    return (
        <Card className="h-[460px]">
            <CardHeader>
                <CardTitle>
                    <TitleBar title="Registros de soporte" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <main className="h-[370px] overflow-y-auto flex flex-col gap-3">
                    <div className="border rounded-md p-4">
                        <div className="flex justify-between items-center">
                            <h4>Cambio de Ram</h4>
                            <span className="text-xs dark:text-gray-300">
                                23/07/2018
                            </span>
                        </div>
                        <div className="mt-2">
                            <p className="text-sm">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Facilis rerum placeat impedit
                                reiciendis commodi adipisci ab? Odio nostrum
                                culpa quam et corrupti, incidunt ut, facilis
                                necessitatibus neque aspernatur nam, alias
                                laudantium dolorum hic iste dolor doloribus
                                sapiente mollitia quia eligendi.
                            </p>
                        </div>
                        <div className="my-2 flex flex-wrap gap-2">
                            <Badge variant={'secondary'}>Ram</Badge>
                            <Badge variant={'secondary'}>Pc</Badge>
                        </div>
                    </div>
                    <div className="border rounded-md p-4">
                        <div className="flex justify-between items-center">
                            <h4>Cambio de Ram</h4>
                            <span className="text-xs dark:text-gray-300">
                                23/07/2018
                            </span>
                        </div>
                        <div className="mt-2">
                            <p className="text-sm">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Facilis rerum placeat impedit
                                reiciendis commodi adipisci ab? Odio nostrum
                                culpa quam et corrupti, incidunt ut, facilis
                                necessitatibus neque aspernatur nam, alias
                                laudantium dolorum hic iste dolor doloribus
                                sapiente mollitia quia eligendi.
                            </p>
                        </div>
                        <div className="my-2 flex flex-wrap gap-2">
                            <Badge variant={'secondary'}>Ram</Badge>
                            <Badge variant={'secondary'}>Pc</Badge>
                        </div>
                    </div>
                    <div className="border rounded-md p-4">
                        <div className="flex justify-between items-center">
                            <h4>Cambio de Ram</h4>
                            <span className="text-xs dark:text-gray-300">
                                23/07/2018
                            </span>
                        </div>
                        <div className="mt-2">
                            <p className="text-sm">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Facilis rerum placeat impedit
                                reiciendis commodi adipisci ab? Odio nostrum
                                culpa quam et corrupti, incidunt ut, facilis
                                necessitatibus neque aspernatur nam, alias
                                laudantium dolorum hic iste dolor doloribus
                                sapiente mollitia quia eligendi.
                            </p>
                        </div>
                        <div className="my-2 flex flex-wrap gap-2">
                            <Badge variant={'secondary'}>Ram</Badge>
                            <Badge variant={'secondary'}>Pc</Badge>
                        </div>
                    </div>
                </main>
            </CardContent>
        </Card>
    )
}
