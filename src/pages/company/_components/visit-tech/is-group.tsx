import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { InstanceAxios } from '@/helper/axios-config'
import { GetDevice } from '@/pages/branch/action/device-actiion.service'
import { GetUsers } from '@/pages/branch/action/users-action.service'
import { url } from 'inspector'
import { useEffect, useState } from 'react'
import { Control } from 'react-hook-form'

interface IsGroupProps {
    isGroup: boolean
    control: Control
    setState: () => void
    index: number
    typeOption: string
}

export default function IsGroup({
    isGroup,
    control,
    index,
    setState,
    typeOption,
}: IsGroupProps) {
    const [ListData, setListData] = useState([])
    const [SelectData, setSelectData] = useState([])
    const [StateSelect, setStateSelect] = useState<boolean>(false)

    const group = {
        device: {
            url: '/device',
        },
        user: {
            url: '/user',
        },
    }
    async function GetData() {
        try {
            const res = await InstanceAxios.get(
                group[typeOption].url +
                    `?branchId=${localStorage.getItem('branchId')}`
            )
            setListData(res.data?.data)
            console.log(res.data?.data)
        } catch (error) {
            setListData([])
            console.log(error?.message)
        }
    }

    useEffect(() => {
        if (typeOption) {
            GetData()
        }
    }, [typeOption])
    return (
        <>
            <div className="flex border p-2">
                <div>
                    <h3>Seleccionar</h3>
                    <p>Seleccione uno o varias</p>
                </div>
                <Button
                    disabled={!isGroup}
                    type="button"
                    onClick={() => setStateSelect(true)}
                >
                    Agregar
                </Button>
            </div>

            <AlertDialog onOpenChange={setStateSelect} open={StateSelect}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Seleccionar</AlertDialogTitle>
                    </AlertDialogHeader>
                    <div>
                        {ListData.map((item, position) => {
                            return (
                                <FormField
                                    key={position}
                                    control={control}
                                    name={`information.${index}.isGroup.${item.id}`}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5 ">
                                                <FormLabel className="text-base">
                                                    {item.name}
                                                </FormLabel>
                                                <FormDescription>
                                                    {item?.codeDevice} -{' '}
                                                    {item?.status}
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={
                                                        field.value ?? false
                                                    }
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                    aria-readonly
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            )
                        })}
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cerrar</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

function IsSelected() {
    return <div></div>
}
