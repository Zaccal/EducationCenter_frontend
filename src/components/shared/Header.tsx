import { cn } from '@/lib/utils'
import { Phone } from 'lucide-react'
import { Separator } from '../ui/separator'
import Burger from './Burger'
import Container from './Container'
import DropdownProfileMenu from './DropdownProfileMenu'

interface IHeader {
    className?: string
}

const Header = ({ className }: IHeader) => {
    return (
        <header className={cn('py-7', className)}>
            <Container>
                <div className="max-[550px]:flex-row max-[760px]:flex-col flex items-center justify-between">
                    <div className="flex items-center min-[760px]:mb-0 mb-3">
                        <div className="">
                            <span className="font-bold text-2xl">
                                LogoLorem
                            </span>
                        </div>
                        <div className="flex items-center">
                            <Separator
                                orientation="vertical"
                                className={cn(
                                    'min-[550px]:block hidden dark:bg-primary-foreground bg-white min-[503px]:mx-9 mx-6 h-9',
                                    className?.includes('home')
                                        ? 'dark:!bg-white bg-white'
                                        : ''
                                )}
                            />

                            <p className="min-[550px]:flex hidden min-[503px]:text-lg text-sm font-semibold">
                                Онлайн образовательный портал
                            </p>
                        </div>
                    </div>
                    <div className="min-[550px]:flex hidden items-center gap-8">
                        <a href="tel:#" className="flex items-center gap-4">
                            <Phone />
                            +7 700 000 00 00
                        </a>
                        <DropdownProfileMenu />
                    </div>
                    <Burger />
                </div>
            </Container>
        </header>
    )
}

export default Header
