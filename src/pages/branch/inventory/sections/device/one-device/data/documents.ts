interface Document {
    label: string
    funct: () => void
}

export const FitchDevice: Array<Document> = [
    {
        label: 'Ficha Técnica',
        funct: () => {
            console.log('Ficha Técnica')
        },
    },
    {
        label: 'Ficha de Soporte',
        funct: () => {
            console.log('Ficha de Soporte')
        },
    },
    {
        label: 'Informe de Incidencias',
        funct: () => {
            console.log('Informe de Incidencias')
        },
    },
]
