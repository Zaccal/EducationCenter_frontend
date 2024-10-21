import AuthorizationForm from '@/components/shared/AuthorizationForm'
import Container from '@/components/shared/Container'
import Header from '@/components/shared/Header'

const Home = () => {
    return (
        <section className="h-screen bg-hero bg-no-repeat bg-center bg-cover text-white">
            <div className="bg-darker h-screen">
                <Header className="home" />
                <Container>
                    <div className="flex-col lg:flex-row flex lg:justify-between lg:items-start py-[100px] lg:py-[120px]">
                        <div className="mx-auto mb-12 lg:m-0">
                            <h1 className="text-center text-2xl leading-[40px] sm:text-3xl sm:leading-[45px] lg:text-left lg:text-4xl max-w-[760px] font-bold lg:leading-[55px]">
                                Добро пожаловать на [Название Сайта] — Ваш
                                Проводник в Мире Знаний!
                            </h1>
                            <p className="hidden lg:block mt-8 max-w-[760px] dark:!text-muted-foreground  leading-[30px]">
                                Предлагаю широкий спектр онлайн-курсов и
                                видеоуроков для всех уровней подготовки. Наши
                                преподаватели — это эксперты с многолетним
                                опытом, готовые помочь вам освоить новые навыки
                                и углубить свои знания в разных областях.
                            </p>
                        </div>
                        <AuthorizationForm />
                    </div>
                </Container>
            </div>
        </section>
    )
}

export default Home
