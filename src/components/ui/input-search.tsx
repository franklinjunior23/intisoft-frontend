import React, { useRef, useState } from 'react'
import { Button, Divider, Input, Select, Space } from 'antd'
import type { InputRef } from 'antd'
import { ChevronUp } from 'lucide-react'

let index = 0

interface AppProps {
    State: string[]
    setState: React.Dispatch<React.SetStateAction<string[]>>
    
}

const InputSearch = ({ State, setState }: AppProps) => {
    const [items, setItems] = useState(State)
    const [name, setName] = useState('')
    const inputRef = useRef<InputRef>(null)

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const addItem = (
        e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
        e.preventDefault()
        setItems([...items, name || `New item ${index++}`])
        setName('')
        setTimeout(() => {
            inputRef.current?.focus()
        }, 0)
    }

    return (
        <Select
            style={{ width: 300 }}
            placeholder="custom dropdown render"
            dropdownRender={(menu) => (
                <>
                    {menu}
                    <Divider style={{ margin: '8px 0' }} />
                    <Space style={{ padding: '0 8px 4px' }}>
                        <Input
                            placeholder="Please enter item"
                            ref={inputRef}
                            value={name}
                            onChange={onNameChange}
                            onKeyDown={(e) => e.stopPropagation()}
                        />
                        <Button
                            type="text"
                            icon={<ChevronUp className="w-4 h-4" />}
                            onClick={addItem}
                        >
                            Add item
                        </Button>
                    </Space>
                </>
            )}
            options={items.map((item) => ({ label: item, value: item }))}
        />
    )
}

export default InputSearch
