import { PlusIcon } from 'lucide-react'
import { Button } from './button'
import { Input } from './input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './select'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface InputDinamicProps {
    data: string[]
    onChange: (value: string) => void
    value?: string | undefined
    placeholder?: string | undefined
}

export default function InputDinamic({
    data,
    value,
    onChange,
    placeholder,
}: InputDinamicProps) {
    const [dataField, setDataField] = useState<string[]>([])
    const [valueField, setValueField] = useState<string | undefined>(value)
    const [inputValue, setInputValue] = useState<string>('')

    useEffect(() => {
        if (data) setDataField(data)
    }, [data])

    useEffect(() => {
        setValueField(value)

        const exist = dataField.filter((item) => item === value)

        if (value && exist.length === 0) {
            setDataField((prev) => [...prev, value])
        }
    }, [value, dataField])

    function addFieldData(newField: string) {
        if (newField === '') {
            return toast.error('El campo no puede estar vacio')
        }
        setDataField([...dataField, newField])
        setInputValue('')
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            addFieldData(inputValue)
        }
    }

    return (
        <>
            <Select onValueChange={onChange} value={value}>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder ?? 'Seleccione'} />
                </SelectTrigger>
                <SelectContent className="w-[300px]" align="start">
                    {dataField.map((item, index) => (
                        <SelectItem key={index} value={item}>
                            {item}
                        </SelectItem>
                    ))}
                    <div className="flex w-[290px] gap-2 mt-3 sticky top-0 left-0">
                        <Input
                            placeholder="Buscar"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <Button
                            size="icon"
                            type="button"
                            className="px-2"
                            onClick={() => addFieldData(inputValue)}
                        >
                            <PlusIcon className="size-4" />
                        </Button>
                    </div>
                </SelectContent>
            </Select>
        </>
    )
}
