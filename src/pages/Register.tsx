import Container from '@/components/shared/Container'
import ErrorLabel from '@/components/shared/ErrorLabel'
import Header from '@/components/shared/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useRegister from '@/hook/useRegister'
import { IRegistrationUser } from '@/types/User.interface'
import { Lock, Mail, UserPen } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const {
        register,
        reset,
        formState: { errors },
        watch,
        handleSubmit,
    } = useForm<IRegistrationUser>()
    const password = watch('password')

    const nav = useNavigate()
    const { registeration, reqestErrorState, isPending } = useRegister()

    const handleSubmitRegistration: SubmitHandler<IRegistrationUser> = (
        data
    ) => {
        registeration({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
        })

        reset()
    }

    return (
        <>
            <Header className="bg-primary text-primary-foreground" />
            <Container>
                <h1 className="text-3xl text-center py-12 font-semibold uppercase">
                    Регистрация
                </h1>
                <form
                    onSubmit={handleSubmit(handleSubmitRegistration)}
                    action="POST"
                    className="max-w-[500px] mx-auto"
                >
                    <ErrorLabel
                        message={[
                            errors?.firstName?.message,
                            ...reqestErrorState,
                        ]}
                        htmlFor="firstName"
                    />
                    <Input
                        id="firstName"
                        className="mb-3"
                        placeholder="Ваше имя"
                        {...register('firstName', {
                            required: {
                                value: true,
                                message: 'Введите ваше имя',
                            },
                        })}
                        Icon={UserPen}
                    />
                    <ErrorLabel
                        message={errors.lastName?.message}
                        htmlFor="lastName"
                    />
                    <Input
                        className="mb-4"
                        placeholder="Ваша фамилия"
                        Icon={UserPen}
                        id="lastName"
                        {...register('lastName', {
                            required: {
                                value: true,
                                message: 'Введите вашу фамилию',
                            },
                        })}
                    />
                    <ErrorLabel
                        message={errors.email?.message}
                        htmlFor="Email"
                    />
                    <Input
                        className="mb-8"
                        placeholder="Почта"
                        id="Email"
                        Icon={Mail}
                        type="email"
                        {...register('email', {
                            required: {
                                value: true,
                                message: 'Введите почту',
                            },
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: 'Почта не правильная',
                            },
                        })}
                    />
                    <ErrorLabel
                        message={[
                            errors.password?.message,
                            errors.confirmPassword?.message,
                        ]}
                        htmlFor="password"
                    />
                    <Input
                        className="mb-4"
                        placeholder="Пароль"
                        Icon={Lock}
                        type="password"
                        {...register('password', {
                            required: {
                                value: true,
                                message: 'Придумайте пароль',
                            },
                            minLength: {
                                value: 8,
                                message:
                                    'Пароль должен содержать более 8 символов',
                            },
                        })}
                    />
                    <ErrorLabel
                        message={errors.confirmPassword?.message}
                        htmlFor="Email"
                    />
                    <Input
                        className="mb-4"
                        placeholder="Повторите пароль"
                        Icon={Lock}
                        type="password"
                        {...register('confirmPassword', {
                            required: {
                                value: true,
                                message: 'Повторите праоль',
                            },
                            validate: (value) =>
                                value === password || 'Пароли не совподают',
                        })}
                    />
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full mt-8 font-semibold"
                    >
                        Регистроваться
                    </Button>
                    <Button
                        disabled={isPending}
                        variant={'outline'}
                        onClick={() => nav('/')}
                        className="mt-4 w-full font-semibold"
                    >
                        Вернутся обратно
                    </Button>
                </form>
            </Container>
        </>
    )
}

export default Register
