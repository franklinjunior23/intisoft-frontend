import { Outlet, useLocation, useParams } from 'react-router-dom'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link } from 'react-router-dom'

export function PageBranch() {
    const { company, branch } = useParams()
    const { pathname } = useLocation()
    const path = pathname.split('/')[3]

    return (
        <div>
            <header>
                {company} - {branch}
            </header>
            <h1>Branch</h1>
            <Tabs defaultValue={path ?? 'usuarios'} className="w-[400px]">
                <TabsList>
                    <TabsTrigger asChild value="usuarios">
                        <Link to={'usuarios'}>Usuarios</Link>
                    </TabsTrigger>
                    <TabsTrigger value="dispositivos" asChild>
                        <Link to={'dispositivos'}>Dispositivos</Link>
                    </TabsTrigger>
                </TabsList>
            </Tabs>
            <Outlet />
        </div>
    )
}
