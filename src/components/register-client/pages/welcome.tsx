import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import { Dispatch, SetStateAction } from 'react'
export default function Welcome({
    setWidth
}: {
    setWidth : Dispatch<SetStateAction<string>>
}) {
    setWidth('md:w-[700px]')
    const { width, height } = useWindowSize()
    return (
        <section className='mb-10'>
            <h3 className="text-4xl text-center font-semibold">Bienvenido a Intisoft ..</h3>
            <p className="mt-10 text-justify">
                Nos complace tenerte a bordo. Aquí en Intisoft, estamos
                comprometidos en ofrecerte la mejor experiencia posible. Navega
                con confianza y aprovecha todas las herramientas que hemos
                diseñado para optimizar tus procesos. ¡Esperamos que disfrutes
                de todas las funcionalidades que hemos preparado para ti!
            </p>
            <Confetti width={width} height={height} />
        </section>
    )
}
