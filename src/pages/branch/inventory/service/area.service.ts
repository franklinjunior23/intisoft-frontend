import { InstanceAxios } from '@/helper/axios-config'
import { areaCreate } from '../validate/area-validate'

export async function CreateArea(datos: areaCreate) {
    const { data } = await InstanceAxios.post('area', datos)
    return data
}
