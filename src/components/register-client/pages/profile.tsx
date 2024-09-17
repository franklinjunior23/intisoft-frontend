import { Dispatch, SetStateAction, useEffect } from 'react'
import FormProfile from '../form-profile'
import { z } from 'zod'
import SchemaProfile from '../validate-profile'
import { ProfileService } from '../service/profile-register.service'
import { toast } from 'sonner'
import { UseNewUser } from '@/providers/new-user'

export default function ProfilePage({
    setWidth,
}: {
    setWidth: Dispatch<SetStateAction<string>>
}) {
    const {} = UseNewUser()
    const { mutate, isPending } = ProfileService({
        succes: (data) => {
            toast.success('Datos guardados')
        },
        error: (error) => {
            console.log(error)
        },
    })

    async function Onsubmit(data: z.infer<typeof SchemaProfile>) {
        mutate(data)
    }

    useEffect(() => {
        if (setWidth) {
            setWidth('md:w-[600px]')
        }
    }, [setWidth])
    return (
        <section>
            <p>
                Para poder continuar , necesitaras rellenar los siguientes datos
            </p>
            <FormProfile Onsubmit={Onsubmit} isloading={isPending} />
        </section>
    )
}
