import { deviceType } from "@/types/device";

export const deviceTypeOptions = {
    [deviceType.DESKTOP]: [
        'All in one',
        'Escritorio',   
        'Gabinete',
        'Compatible',
        'Mini pc',
        'Workstation',
    ],
    [deviceType.SERVER]: [
        'Rack',
        'Torre',
        'Blade',
        'Microserver',
        'Mainframe',
    ],
    [deviceType.LAPTOP]: [
        'Ultrabook',
        'Netbook',
        'Chromebook',
        'Macbook',
        'Gaming',
    ],
    [deviceType.RED]: [
        'Router',
        'Switch',
        'Access point',
        'Modem',
        'Firewall',
        'Bridge',
        'Repeater',
        'Hub',
        'Gateway',
    ],
    [deviceType.PRINTER]: [
        'Laser',
        'Inyección de tinta',
        'Matricial',
        'Plotter',
        '3D',
    ],
};