import { FormSign } from '../../pages/Sign-In/_components/form-sign-in'
import { Codesandbox } from 'lucide-react'

export default function SignIn() {
    return (
        <main className="w-screen h-screen bg-slate-50/50 grid md:grid-cols-2">
            <main className="p-8 bg-black/90 min-h-full">
                <div className="flex flex-col justify-between font-semibold h-full text-white">
                    <span className=" flex items-center gap-4  text-lg">
                        <Codesandbox className="" />
                        Intiscorp Sac
                    </span>
                    <span>
                        {'"'}Software de activos{'"'}{' '}
                    </span>
                </div>
            </main>
            <main className="p-8 h-full  grid place-content-center md:w-[50%] mx-auto">
                <h3 className="text-xl text-center font-semibold">
                    Iniciar Sesion
                </h3>
                <p className="text-sm mt-3 text-muted-foreground text-center">
                    Ingrese su usuario y contraseña para acceder al sistema
                </p>
                <FormSign />
                <p className="px-8 mt-5 text-center text-sm text-muted-foreground">
                    Al hacer clic en continuar, acepta nuestros
                    <a
                        className="underline underline-offset-4 hover:text-primary"
                        href="/terms"
                    >
                        {' '}
                        Términos de servicio{' '}
                    </a>
                    y{' '}
                    <a
                        className="underline underline-offset-4 hover:text-primary"
                        href="/privacy"
                    >
                        Política de privacidad.
                    </a>
                    .
                </p>
            </main>
        </main>
    )
}
