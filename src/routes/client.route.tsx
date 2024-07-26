import { routes } from '@/types/routes'
import {
    FileText,
    LayoutDashboard,
    MonitorSmartphone,
    Users,
} from 'lucide-react'

export const ClientRoutes = (): routes[] => {
    return [
        {
            href: '/',
            label: 'Dashboard',
            icon: <LayoutDashboard className="w-5 h-5" />,
        },
        {
            href: '/usuarios',
            label: 'Usuarios',
            icon: <Users className="w-5 h-5" />,
        },
        {
            href: '/dispositivos',
            label: 'Dispositivos',
            icon: <MonitorSmartphone className="w-5 h-5" />,
        },
        {
            href: '/visitas-tecnicas',
            label: 'Visitas Tecnicas',
            icon: <FileText className="w-5 h-5" />,
        },
    ]
}
