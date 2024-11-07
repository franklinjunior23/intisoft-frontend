import { useEffect, useState } from 'react'

type OpenFolderTypes = {
    id: string
    isOpen: boolean
}

export function OpenFolder() {
    const [OpenFolderId, setOpenFolderId] = useState<OpenFolderTypes[] | null>(
        null
    )

    function getOpensFolder() {
        return setOpenFolderId(JSON.parse(localStorage.getItem('openFolders')))
    }
    function changeOpenFolder(id: string) {
        const newOpenFolders = OpenFolderId?.map((folder) => {
            if (folder.id === id) {
                return {
                    id: folder.id,
                    isOpen: !folder.isOpen,
                }
            }
            return folder
        })
        setOpenFolderId(newOpenFolders)
        localStorage.setItem('openFolders', JSON.stringify(newOpenFolders))
    }
    useEffect(() => {
        getOpensFolder()
    }, [])

    return { OpenFolderId, changeOpenFolder }
}
