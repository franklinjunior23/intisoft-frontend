export function Time(dateInput: Date | string) {
    // Convertir el string a un objeto Date si es necesario
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput

    // Configurar la zona horaria a "America/Lima"
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Lima',
        day: 'numeric',
        month: 'long',
    }

    // Crear una instancia de Intl.DateTimeFormat para formatear la fecha
    const formatter = new Intl.DateTimeFormat('es-ES', options)

    // Formatear la fecha
    const partes = formatter.formatToParts(date)

    // Extraer día y mes
    let dia: string | undefined
    let mes: string | undefined

    partes.forEach((part) => {
        if (part.type === 'day') {
            dia = part.value
        } else if (part.type === 'month') {
            mes = part.value.charAt(0).toUpperCase() + part.value.slice(1)
        }
    })

    // Asegurarse de que día y mes estén definidos
    if (!dia || !mes) {
        throw new Error('Error al formatear la fecha')
    }

    return `${dia} de ${mes}`
}

export function Time_year(dateInput: Date | string) {
    // Convertir el string a un objeto Date si es necesario
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput

    // Configurar la zona horaria a "America/Lima"
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Lima',
        day: 'numeric',
        month: '2-digit', // Mes como número de dos dígitos
        year: 'numeric', // Incluir año
    }

    // Crear una instancia de Intl.DateTimeFormat para formatear la fecha
    const formatter = new Intl.DateTimeFormat('es-ES', options)

    // Formatear la fecha
    const partes = formatter.formatToParts(date)

    // Extraer día, mes y año
    let dia: string | undefined
    let mes: string | undefined
    let año: string | undefined

    partes.forEach((part) => {
        if (part.type === 'day') {
            dia = part.value
        } else if (part.type === 'month') {
            mes = part.value
        } else if (part.type === 'year') {
            año = part.value
        }
    })

    // Asegurarse de que día, mes y año estén definidos
    if (!dia || !mes || !año) {
        throw new Error('Error al formatear la fecha')
    }

    return `${dia}/${mes}/${año}`
}

export function Time_day(dateInput: Date | string, timeZone: string = 'America/Lima') {
    // Convertir el string a un objeto Date si es necesario
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

    // Convertir la fecha a la zona horaria deseada utilizando toLocaleString
    return date.toLocaleString('es-ES', {
        timeZone: timeZone,
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // Para usar formato de 12 horas (AM/PM)
    });
}


