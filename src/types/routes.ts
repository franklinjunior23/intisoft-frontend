export interface routes {
    label: string
    icon?: JSX.Element
    href?: string
    onclick?: () => void
    children?: routes[]
    ifChildren?: boolean
}
