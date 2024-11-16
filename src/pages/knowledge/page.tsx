import { Input } from '@/components/ui/input'
import { useEffect, useRef, useState } from 'react'
import { MenuList } from './components/menu-list'
import { GetKnowledge } from './service/get-knowledge'
import { Badge } from '@/components/ui/badge'
import StoreFile from './state/file-state'
import TextEditor from '@/components/shared/text-editor/text-editor'

export default function PageKnowledge() {
    const { isLoading, data } = GetKnowledge()
    const { data: DataFile } = StoreFile()

    useEffect(() => {
        document.getElementById('breadcrumId')!.innerHTML =
            'Base de Conocimiento'
        return () => {
            document.getElementById('breadcrumId')!.innerHTML = ''
        }
    }, [])

    if (isLoading) {
        return <div>Cargando...</div>
    }

    return (
        <>
            <main>
                <header className="flex flex-col md:flex-row gap-5 justify-between items-end ">
                    <Input
                        placeholder="Buscar en la base de conocimiento"
                        className="md:w-[260px]"
                    />
                    <div className="flex gap-2">
                        <Badge>Carpetas : {data?.meta.quantityFolders}</Badge>
                        <Badge>
                            Documentos : {data?.meta.quantityArticles}
                        </Badge>
                    </div>
                </header>
                <section className="grid grid-cols-[300px_1fr] mt-5">
                    <MenuList data={data.data} />
                    <article>
                        {!DataFile ? (
                            <div className="flex justify-center items-center h-full">
                                <p className="text-gray-500">
                                    Seleccione un documento
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* <ViewKnowledge
                                    content={DataFile.content}
                                    id={DataFile.id}
                                /> */}
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: DataFile.content,
                                    }}
                                ></div>
                            </>
                        )}
                    </article>
                </section>
            </main>
        </>
    )
}

function ViewKnowledge({ id, content }: { id: string; content: string }) {
    const [DataContent, setDataContent] = useState<string>(content)
    const refEditor = useRef(null)
    useEffect(() => {
        setDataContent(content)

        if (refEditor.current) {
            refEditor.current.editor.setContent(content)
        }
    }, [content, id])
    return (
        <>
            {/* <TextEditor state={DataContent} disabled /> */}
            <button
                onClick={() => {
                    console.log(refEditor)
                }}
            >
                dd
            </button>
        </>
    )
}
