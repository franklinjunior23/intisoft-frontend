import { GetCompanyClient } from './action/company-client.service'

export default function ClientHome() {
    const { isLoading, data } = GetCompanyClient()
    if (isLoading) return <h1>Loading...</h1>

    return (
        <div className="">
            <h1 className="text-4xl font-bold">{data?.data.name}</h1>
        </div>
    )
}
