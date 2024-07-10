import axios from 'axios'

const { MODE, VITE_API_DOMAIN, VITE_API_DOMAIN_PRODUCTION } = import.meta.env

console.log(MODE)

export const InstanceAxios = axios.create({
    baseURL:
        MODE === 'development' ? VITE_API_DOMAIN : VITE_API_DOMAIN_PRODUCTION,
    withCredentials: true,
})

console.log(import.meta.env)
