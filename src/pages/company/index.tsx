import { useParams } from 'react-router-dom'
import { BranchsGet } from './action/company.service'
import { Time_year } from '@/helper/time/transform-date'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LocalStorageKeys } from '@/constants/localstorage-keys'

export function PageCompanie() {
    const { company } = useParams()
    const { data, isLoading } = BranchsGet()
    if (isLoading) return <h1>Loading...</h1>
    return (
        <main>
            <h3>Empresa : {company}</h3>
            {data?.meta.quantity}
            <article className="flex gap-2 mt-5">
                {data?.data.branchs?.map((branch) => (
                    <div key={branch.id} className="border p-4">
                        <Link
                            to={`${branch.name}`}
                            onClick={() => {
                                localStorage.setItem(
                                    LocalStorageKeys.branch,
                                    branch.id
                                )
                            }}
                        >
                            <h4>{branch.name}</h4>
                        </Link>
                        <p>
                            {branch.token}
                            <Button
                                size={'icon'}
                                onClick={() => {
                                    navigator.clipboard.writeText(branch.token)
                                }}
                                variant={'ghost'}
                            >
                                <Copy className="w-4 h-5" />
                            </Button>
                        </p>
                        <p>{Time_year(branch.createdAt)}</p>
                    </div>
                ))}
            </article>
        </main>
    )
}
