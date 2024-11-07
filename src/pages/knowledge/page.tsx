import { Input } from '@/components/ui/input'
import { useEffect } from 'react'
import { MenuList } from './components/menu-list'
import { GetKnowledge } from './service/get-knowledge'
import { Badge } from '@/components/ui/badge'

export default function PageKnowledge() {
    const { isLoading, data } = GetKnowledge()

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
                    <article>SELECCIONE UNO</article>
                </section>
            </main>
        </>
    )
}
