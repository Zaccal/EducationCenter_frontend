import useLogin from '@/hook/useLogin'
import { ILogin } from '@/types/Auth.inerfaces'
import { LockKeyhole, Mail } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import Loader from '../ui/Loader'
import ErrorLabel from './ErrorLabel'

const AuthorizationForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ILogin>()
    const { login, error, isPending } = useLogin()

    const onSubmit: SubmitHandler<ILogin> = (data: ILogin) => {
        login(data)
        reset()
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
            className="mx-auto lg:m-0 p-9 rounded-lg backdrop-blur-md bg-forblur border border-forblur max-w-[340px]"
        >
            <h3 className="text-center text-xl lg:text-2xl font-bold uppercase">
                Добро пожаловать
            </h3>
            <p className="text-center ">Вход систему</p>

            <div className="mt-6 text-foreground">
                <ErrorLabel
                    htmlFor="email"
                    message={[
                        errors.email?.message,
                        error?.response.data.statusCode === 400
                            ? 'Почта или пароль не верны'
                            : undefined,
                    ]}
                />
                <Input
                    className="mb-4"
                    id="email"
                    disabled={isPending}
                    Icon={Mail}
                    type="email"
                    variant={errors.email ? 'error' : 'defualt'}
                    placeholder="Email"
                    {...register('email', {
                        required: 'Ведите почту',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Почта не правильная',
                        },
                    })}
                />

                <ErrorLabel
                    htmlFor="password"
                    message={errors.password?.message}
                />
                <Input
                    Icon={LockKeyhole}
                    type="password"
                    variant={errors.password ? 'error' : 'defualt'}
                    id="password"
                    disabled={isPending}
                    placeholder="Password"
                    {...register('password', {
                        required: true,
                    })}
                />
                <Button
                    variant={'secondary'}
                    disabled={isPending}
                    className="w-full mt-6 font-semibold uppercase"
                >
                    {isPending ? (
                        <Loader className="w-5 h-5 border-2" />
                    ) : (
                        'Вход'
                    )}
                </Button>

                <Link to={'/register'}>
                    <Button
                        type="submit"
                        disabled={isPending}
                        variant={'outline'}
                        className="w-full bg-transparent text-white mt-3 font-semibold uppercase"
                    >
                        Регистрация
                    </Button>
                </Link>

                <Button
                    variant={'link'}
                    disabled={isPending}
                    className="w-full bg-transparent text-white mt-3 font-semibold uppercase"
                >
                    Забыли свой пароль?
                </Button>
            </div>
        </form>
    )
}

export default AuthorizationForm
