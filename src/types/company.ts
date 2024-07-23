export interface CompaniesGet {
    data: company[] | []
    meta: Meta
}

export interface company {
    id: string
    name: string
    place: string
    businessName: string
    createdAt: Date
    deletedAt?: null | Date
}
export interface Meta {
    quantity?: number
}
export interface CompanyCreate {
    name: string
    place: string
    businessName: string
}

export interface editCompany extends Partial<CompanyCreate> {
    id: string
}

export interface BranchCreate {
    name: string
    companyId: string
}

