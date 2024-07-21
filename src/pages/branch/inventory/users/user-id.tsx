import { InstanceAxios } from '@/helper/axios-config'
import { FormUser } from './_components/form-user'
import BreadCrum from '@/components/shared/breadcum'
import { Suspense, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { user } from '@/types/users'

export function PageUserOne() {
    const [Userdata, setUserdata] = useState<user | null>(null)
    const { userId } = useParams()

    useEffect(() => {
        (async () => {
            const {data} = await InstanceAxios.get(`user/${userId}`)
            console.log(data)
            setUserdata(data)
        })()
    }, [userId])

    return (
        <main>
            <BreadCrum />
            <Suspense fallback={<div>Loading...</div>}>
                <FormUser data={Userdata} />
            </Suspense>
        </main>
    )
}
