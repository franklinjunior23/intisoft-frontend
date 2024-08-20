import axios, { AxiosInstance } from 'axios'

const { MODE, VITE_API_DOMAIN, VITE_API_DOMAIN_PRODUCTION } = import.meta.env

export const InstanceAxios: AxiosInstance = axios.create({
    baseURL:
        MODE === 'development' ? VITE_API_DOMAIN : VITE_API_DOMAIN_PRODUCTION,
    withCredentials: true,
})
