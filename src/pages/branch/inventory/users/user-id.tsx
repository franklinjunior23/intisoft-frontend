import { GetOneUser } from '../../action/users-action.service'
import { FormUser } from './_components/form-user'


export function PageUserOne() {
    const { isLoading, data } = GetOneUser()

    if (isLoading) return <div>Loading...</div>

    console.log(data)

    return (
        <main>
            <FormUser data={data} />
            {data.name}
            {data.lastName}
            User
        </main>
    )
}
