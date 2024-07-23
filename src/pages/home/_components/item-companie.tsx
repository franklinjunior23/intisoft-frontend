import { Button } from '@/components/ui/button'
import { CarouselItem } from '@/components/ui/carousel'
import { LocalStorageKeys } from '@/constants/localstorage-keys'
import { Truncate } from '@/helper/truncate-text'
import { company, editCompany } from '@/types/company'
import { Save } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import EllipsisEdit from './item-edit-company'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editCompany as EditCompany } from '../action/company.service'

type dataCompany = {
    id: string
    name?: string
    place?: string
    businessName?: string
}
interface Edit {
    id: string
    value: string
    notediting: () => void
    mutatefn: (data: dataCompany) => void
    loadingfn: boolean
}

function Edit({ id, value, notediting, mutatefn }: Edit) {
    const [valueInput, setvalueInput] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null)

    function changeInput(e: React.ChangeEvent<HTMLInputElement>) {
        setvalueInput(e.target.value)
    }
    function handleClickOutside(e: MouseEvent) {
        if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
            notediting
        }
    }
    function EnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            mutatefn({
                id,
                name: valueInput,
            })
            toast.success('Editado de manera correcta ')
            notediting()
        }
    }

    useEffect(() => {
        setvalueInput(value)
    }, [value])

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    inputRef.current?.focus()

    return (
        <div className="flex items-center gap-0.5">
            <Input
                ref={inputRef}
                onKeyDown={EnterKey}
                value={valueInput}
                onChange={changeInput}
            />
            <Button variant={'default'} size={'icon'}>
                <Save className="w-5 h-5" />
            </Button>
        </div>
    )
}

export default function ItemCompany({
    id,
    name,
    businessName,
    place,
}: company) {
    const [EditItem, setEditItem] = useState<boolean>(false)
    const Client = useQueryClient()

    const editCompany = useMutation({
        mutationFn: async (data: editCompany) => {
            return await EditCompany(data)
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message)
                return Client.refetchQueries()
            }

            return toast.info(`No se ha podido editar,${data?.message}`)
        },
        onError: (data) => {
            toast.error(`Ha ocurrido un error | ${data.message}`)
        },
    })

    function EditChange() {
        setEditItem(true)
    }
    function CancelChange() {
        setEditItem(false)
    }
    return (
        <CarouselItem className="md:w-[360px]   md:max-w-[360px]  md:min-w-[360px]">
            <div className=" p-4 rounded-xl bg-orange-200/50 h-full">
                <header className="flex justify-between items-center">
                    {EditItem ? (
                        <>
                            <Edit
                                loadingfn={editCompany.isPending}
                                mutatefn={editCompany.mutate}
                                id={id}
                                value={name}
                                notediting={CancelChange}
                            />
                        </>
                    ) : (
                        <Link
                            to={name}
                            onClick={() => {
                                localStorage.setItem(
                                    LocalStorageKeys.company,
                                    id
                                )
                            }}
                        >
                            <h1 className="text-2xl font-bold">
                                <Truncate text={name} maxlength={20} />
                            </h1>
                        </Link>
                    )}
                    <EllipsisEdit editing={EditChange} id={id} />
                </header>
                <footer className="mt-10 text-sm grid">
                    <span>
                        <span className="font-semibold">Razon Social: </span>
                        <Truncate text={businessName} maxlength={20} />
                    </span>
                    <span>
                        <span className="font-semibold">Ubicación: </span>
                        {place}
                    </span>
                </footer>
            </div>
        </CarouselItem>
    )
}
