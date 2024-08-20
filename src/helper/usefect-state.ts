import { useState, useEffect } from 'react'
import { AxiosRequestConfig, AxiosError } from 'axios'
import { InstanceAxios } from './axios-config'
import { UseAuth } from '@/providers/auth.provider'

interface StateData<T> {
    data: T | null
    isLoading: boolean
    isError: boolean
    errorMessage: string | null
}

export function useFetchData<T>(url: string, config?: AxiosRequestConfig) {
    const { token } = UseAuth()
    console.log(token)
    const [state, setState] = useState<StateData<T>>({
        data: null,
        isLoading: true,
        isError: false,
        errorMessage: null,
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await InstanceAxios.get<T>(
                    url,
                    config ?? {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                setState({
                    data: response.data,
                    isLoading: false,
                    isError: false,
                    errorMessage: null,
                })
            } catch (error) {
                const err = error as AxiosError
                setState({
                    data: null,
                    isLoading: false,
                    isError: true,
                    errorMessage: err.message || 'An error occurred',
                })
            }
        }

        fetchData()
    }, [url, config, token])

    return { ...state }
}
