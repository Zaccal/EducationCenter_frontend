import useAuth from '@/hook/useAuth'
import useLogout from '@/hook/useLogout'
import { LogOut, Settings, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const DropdownProfileMenu = () => {
    const { data, isAuth, isLoading } = useAuth()
    const { logout } = useLogout()

    if (!isAuth || isLoading) return <></>

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                    <Avatar>
                        <AvatarImage src={data?.avatar} alt="Avatar" />
                        <AvatarFallback className="text-sm">
                            {data?.firstName[0].toUpperCase()}
                            {data?.firstName[1].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>
                        {data?.firstName} {data?.lastName}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to={'/profile'}>
                        <DropdownMenuItem className="cursor-pointer">
                            <User className="mr-2 h-4 w-4" />
                            <span>Профиль</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link to={'/settings'}>
                        <DropdownMenuItem className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Настройки</span>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        variantHover="danger"
                        className="cursor-pointer"
                        onClick={() => logout()}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Выйти с аккаунта</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default DropdownProfileMenu
