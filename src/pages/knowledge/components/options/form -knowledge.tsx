import TextEditor from '@/components/shared/text-editor/text-editor'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCallback, useState } from 'react'
import { Control, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { SchemaKnowledge } from './knowledge.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Minus, PlusCircle, Trash } from 'lucide-react'
import { CreateKnowledge } from '../../service/create-knowledge'
import { toast } from 'sonner'

function debounce(func, wait: number) {
    let timeout: NodeJS.Timeout
    return function (...args) {
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(this, args), wait)
    }
}

export function FormKnowledge({
    folderId,
    dialogClose,
}: {
    folderId: string
    dialogClose: () => void
}) {
    const MUTATECREATEKNOWLEDGE = CreateKnowledge({
        onSucces: (data) => {
            if (data?.success) {
                toast.success(data?.message)
                dialogClose()
            }
        },
        onError: (error) => {
            toast.error(error?.message)
            alert('Contactarse con el soporte')
        },
    })
    const [TextBoard, setTextBoard] = useState<string>('')
    const onValueChange = useCallback(
        debounce((value: string) => {
            setTextBoard(value)
        }, 300),
        []
    )
    const Submit = (data: z.infer<typeof SchemaKnowledge>) => {
        MUTATECREATEKNOWLEDGE.mutate({ ...data, content: TextBoard })
    }
    return (
        <main className="flex gap-2">
            <TextEditor state={TextBoard} changeText={onValueChange} />
            <Header
                onSubmit={Submit}
                folderId={folderId}
                isPending={MUTATECREATEKNOWLEDGE.isPending}
            />
        </main>
    )
}

function FieldCategory({ control }: { control: Control }) {
    const [Category, setCategory] = useState<string>('')
    const arrayCategory = useFieldArray({
        control,
        name: 'category',
    })
    function AddCategory() {
        if (Category === '')
            return toast.error('No puedes agregar una categoria vacia')

        arrayCategory.append({ name: Category })
        toast.success(`Categoria agregada con exito | ${Category}`)
        setCategory('')
    }
    return (
        <div>
            <h3 className="text-sm">Categoria</h3>
            <div>
                <section className="flex gap-2">
                    <Input
                        value={Category}
                        onChange={(e) => {
                            setCategory(e.target.value)
                        }}
                        placeholder="Escribe una categoria"
                        onKeyDownCapture={(e) => {
                            if (e.key === 'Enter') {
                                AddCategory()
                            }
                        }}
                    />
                    <Button
                        size="icon"
                        variant="outline"
                        type="button"
                        onClick={AddCategory}
                    >
                        <PlusCircle className="h-4 w-4" />
                    </Button>
                </section>
            </div>
            {
                <ul className="flex gap-x-0.5 flex-wrap mt-4">
                    {arrayCategory.fields.map(
                        (field: { id: string; name: string }, index) => (
                            <li
                                key={field.id}
                                className="mt-3 flex items-center gap-1 px-2 text-white text-sm  rounded-md border py-0.5"
                            >
                                <span>{field.name}</span>
                                <span
                                    onClick={() => {
                                        arrayCategory.remove(index)
                                    }}
                                    className="cursor-pointer"
                                >
                                    <Minus className="h-4 w-4" />
                                </span>
                            </li>
                        )
                    )}
                </ul>
            }
        </div>
    )
}

export function Header({
    onSubmit,
    folderId,
    isPending,
}: {
    onSubmit: (data: z.infer<typeof SchemaKnowledge>) => void
    folderId: string
    isPending: boolean
}) {
    const formd = useForm<z.infer<typeof SchemaKnowledge>>({
        resolver: zodResolver(SchemaKnowledge),
        defaultValues: {
            folderId: folderId,
        },
    })
    const { control } = formd

    return (
        <div className="w-[30%]">
            <Form {...formd}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        formd.handleSubmit(onSubmit)()
                    }}
                    className="flex flex-col gap-2 h-full justify-between"
                >
                    <div className="flex flex-col gap-2">
                        <FormField
                            control={control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Titulo</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Titulo"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FieldCategory control={control} />
                    </div>
                    <div className="flex justify-between gap-2">
                        <Button disabled={isPending} className="w-full">
                            {isPending ? 'Cargando...' : 'Crear articulo'}
                        </Button>
                        <Button size="icon" variant="destructive">
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
