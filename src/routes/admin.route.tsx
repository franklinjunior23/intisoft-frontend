import { routes } from '@/types/routes'
import { Building, LayoutDashboard } from 'lucide-react'

export const AdminRoutes: routes[] = [
    {
        href: '/',
        label: 'Dashboard',
        icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
        label: 'Empresas',
        icon: <Building className="w-5 h-5" />,
        children: [
            {
                label: 'company',
                href: '/:id',
                icon: <Building className="w-5 h-5" />,
            },
        ],
    },
]
