import { BookIcon, Building, LayoutDashboard, Users } from 'lucide-react'
import { routes } from '@/types/routes'
import { useStateCompany } from '@/states/company.state'
import { useQueryClient, InvalidateQueryFilters } from '@tanstack/react-query' // Import InvalidateQueryFilters
import { KeyQuerys } from '@/constants/keys-query'
import { LocalStorageState } from '@/states/localstorage.state'

export const AdminRoutes = (): routes[] => {
    const { state } = useStateCompany()
    const client = useQueryClient()
    const { setCompany } = LocalStorageState()
    function addLocal(company: string) {
        setCompany(company)

        setTimeout(() => {
            client.invalidateQueries([
                KeyQuerys.getBranchsByCompany,
            ] as InvalidateQueryFilters)
        }, 500)
    }

    return [
        {
            href: '/',
            label: 'Dashboard',
            icon: <LayoutDashboard className="w-5 h-5" />,
        },
        {
            label: 'Empresas',
            icon: <Building className="w-5 h-5" />,
            children:
                state?.map((company) => ({
                    href: `/${company.name}`,
                    label: company.name,
                    onclick: () => addLocal(company.id),
                })) || [],
        },
        {
            href: '/user-system',
            label: 'Usuarios',
            icon: <Users className="w-5 h-5" />,
        },
        {
            href: '/knowledge',
            label: 'Conocimiento',
            icon: <BookIcon className="w-5 h-5" />,
        },
    ]
}
