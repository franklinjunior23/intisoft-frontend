import { TooltipDelay } from '@/components/ui/tooltip-delay'
import { Truncate } from '@/helper/truncate-text'
import { Folder as FolderType } from '@/types/knowledge'
import { ChevronDown, ChevronRight, Folder } from 'lucide-react'
import { useState } from 'react'
import { MenuList } from './menu-list'
import DocumentItem from './document-item'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { FolderAdd } from './options/folder-add'
import { DeleteFolder } from './options/folder-delete'
import { DocumentAdd } from './options/document-add'

type FileItemProps = {
    name: string
    id: string
    createdAt: Date
    folder: FolderType
}

export default function FileItem({ id, name, folder }: FileItemProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isOpenMenu, setisOpenMenu] = useState<boolean>(false)

    // ADD SERVICE TO OPEN FOLDER FOR LOCALSTORAGE

    return (
        <div className="py-1">
            <ContextMenu modal={isOpenMenu}>
                <ContextMenuTrigger>
                    <div
                        className="flex items-center py-1 cursor-pointer p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? (
                            <ChevronDown className="w-4 h-4 mr-2" />
                        ) : (
                            <ChevronRight className="w-4 h-4 mr-2" />
                        )}
                        <Folder className="w-4  h-4 mr-2" />
                        <span>
                            <TooltipDelay
                                children={
                                    <Truncate text={name} maxlength={22} />
                                }
                                content={name}
                            />
                        </span>
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <FolderAdd setisOpenMenu={setisOpenMenu} id={id} />
                    <DocumentAdd setisOpenMenu={setisOpenMenu} id={id} />
                    <DeleteFolder id={id} setisOpenMenu={setisOpenMenu} />
                </ContextMenuContent>
            </ContextMenu>

            {isOpen && (
                <>
                    {folder?.subfolders?.length > 0 && (
                        <div className="ml-4">
                            <MenuList data={folder.subfolders} />
                        </div>
                    )}
                    {folder?.articles?.length > 0 && (
                        <div className="ml-12">
                            {folder.articles.map((article) => (
                                <DocumentItem key={article.id} {...article} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
