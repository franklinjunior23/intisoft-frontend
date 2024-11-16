import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TooltipDelay } from '@/components/ui/tooltip-delay'
import { InstanceAxios } from '@/helper/axios-config'
import { Time_year } from '@/helper/time/transform-date'
import { Truncate } from '@/helper/truncate-text'
import { useQuery } from '@tanstack/react-query'

export function AuditList() {
    const { data, isLoading } = GetAudit()
    if (isLoading) return <div>Loading...</div>
    return (
        <Card className="max-w-full ">
            <CardHeader>
                <CardTitle>Audit List</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="flex flex-col gap-2 h-[500px] overflow-y-auto ">
                    {data?.map((item: Audit) => (
                        <ItemAudit {...item} key={item.id} />
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}
function GetAudit() {
    return useQuery<Audit[] | []>({
        queryKey: ['audit'],
        queryFn: async () => {
            const { data } = await InstanceAxios.get('/audit')
            return data
        },
    })
}
interface Audit {
    id: number
    description: string
    type: string
    action: string
    createdAt: string
}

function ItemAudit({ action, type, createdAt, description }: Audit) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm flex justify-between items-center ">
                    {type} <Badge>{action}</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-sm">
                    <TooltipDelay
                        children={
                            <p className="break-words text-start">
                                <Truncate text={description} maxlength={100} />
                            </p>
                        }
                        content={
                            <p className="w-[150px] break-words">
                                {description}
                            </p>
                        }
                    />
                </div>
                <footer className="mt-2">
                    <span className="text-sm">
                        Fecha : {Time_year(createdAt)}
                    </span>
                </footer>
            </CardContent>
        </Card>
    )
}
