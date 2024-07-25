import { useParams } from 'react-router-dom'
import { BranchsGet } from './action/company.service'
import { Time_year } from '@/helper/time/transform-date'
import { Button } from '@/components/ui/button'
import { Copy, PlusCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LocalStorageKeys } from '@/constants/localstorage-keys'
import { Badge } from '@/components/ui/badge'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Truncate } from '@/helper/truncate-text'
import { toast } from 'sonner'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import AddBranch from './_components/add-branch'

export function PageCompanie() {
    const { data, isLoading } = BranchsGet()
    const [FilterBranch, setFilterBranch] = useState<string>('')
    function change(e: React.ChangeEvent<HTMLInputElement>) {
        setFilterBranch(e.target.value)
    }
    if (isLoading) return <h1>Loading...</h1>
    return (
        <main>
            <header>
                <ul>
                    <li>Razon Social : {data?.data.businessName}</li>
                    <li>Ubicacion : {data?.data.place}</li>
                </ul>
                <footer className="mt-2 flex justify-between items-end">
                    <div>
                        <Input
                            value={FilterBranch}
                            onChange={change}
                            placeholder="Buscar Sucursal ..."
                        />
                    </div>
                    <div className="flex gap-2 items-end">
                        <Badge variant={'default'}>
                            Sucursales : {data?.meta.quantity}
                        </Badge>
                        <AddBranch />
                    </div>
                </footer>
            </header>

            <article className="flex gap-2 flex-wrap mt-5">
                {data?.data.branchs?.map((branch) => (
                    <Card
                        key={branch.id}
                        className="max-w-[300px] min-w-[330px]"
                    >
                        <CardHeader>
                            <CardTitle>
                                <Link
                                    to={`${branch.name}`}
                                    onClick={() => {
                                        localStorage.setItem(
                                            LocalStorageKeys.branch,
                                            branch.id
                                        )
                                    }}
                                >
                                    <h4 className="text-lg">{branch.name}</h4>
                                </Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className=" p-">
                            <div className="flex justify-between items-center text-sm">
                                <Truncate text={branch.token} maxlength={25} />
                                <Button
                                    size={'icon'}
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            branch.token
                                        )
                                        toast.success('Token copiado')
                                    }}
                                    variant={'secondary'}
                                >
                                    <Copy className="w-4 h-5" />
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter className="text-xs">
                            {Time_year(branch.createdAt)}
                        </CardFooter>
                    </Card>
                ))}
            </article>
        </main>
    )
}
