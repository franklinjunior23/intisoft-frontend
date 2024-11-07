import { Folder } from '@/types/knowledge'
import FileItem from './file-item'

type MenuListProps = {
    data: Folder[]
}

export function MenuList({ data }: MenuListProps) {
    return (
        <nav className="flex flex-col">
            {data.map((item: Folder) => {
                return (
                    <FileItem
                        folder={item}
                        key={item.id}
                        id={item.id}
                        {...item}
                    />
                )
            })}
        </nav>
    )
}
