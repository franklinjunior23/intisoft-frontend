export interface Folder {
    id: string
    name: string
    createdAt: Date
    deletedAt: Date | null
    parentFolder: null | string
    articles: Article[] | []
    subfolders: Folder[] | []
}

export interface Article {
    id: string
    title: string
    content: string
    category: string[]
    files: null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}

export interface GetKnowledgeResponse {
    meta: {
        quantityFolders: number
        quantityArticles: number
    }
    data: Folder[]
}
