import { company, Meta } from "./company";

export interface branchs extends company{
    branchs?: branch[] | []

}
export interface branch {
    id: string
    name: string
    token: string
    createdAt: Date
}

export interface BranchsGet {
    data: branchs 
    meta: Meta
}