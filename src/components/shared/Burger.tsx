import useAuth from '@/hook/useAuth'
import useLogout from '@/hook/useLogout'
import { LogOut, Menu, Settings, User } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
} from '../ui/drawer'
import { Separator } from '../ui/separator'

const Burger = () => {
    const [isOpen, setOpen] = useState(false)
    const { data } = useAuth()
    const { logout } = useLogout()

    return (
        <Drawer open={isOpen} onOpenChange={setOpen}>
            <DrawerTrigger className="min-[550px]:hidden block" asChild>
                <Menu size={32} />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={data?.avatar} alt="Avatar" />
                            <AvatarFallback className="text-sm">
                                {data?.firstName[0].toUpperCase()}
                                {data?.firstName[1].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <p>
                            {data?.firstName} {data?.lastName}
                        </p>
                    </div>
                </DrawerHeader>
                <Separator />
                <div className="mt-5 px-6">
                    <Link to={'/profile'}>
                        <Button
                            variant={'ghost'}
                            className="w-full text-[15px] px-0 justify-start"
                            size={'lg'}
                        >
                            <User className="mr-2 h-4 w-4" />
                            <span>Профиль</span>
                        </Button>
                    </Link>
                    <Link to={'/settings'}>
                        <Button
                            variant={'ghost'}
                            className="w-full text-[15px] px-0 justify-start"
                            size={'lg'}
                        >
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Настройки</span>
                        </Button>
                    </Link>
                    <Link to={'/settings'}>
                        <Button
                            variant={'ghost'}
                            className="w-full text-[15px] text-red-500 px-0 justify-start"
                            size={'lg'}
                            onClick={() => logout()}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Выйти с аккаунта</span>
                        </Button>
                    </Link>
                </div>
                <div className="mt-6 px-4"></div>
                <div className="p-4 py-[30vh]"></div>
            </DrawerContent>
        </Drawer>
    )
}

export default Burger
