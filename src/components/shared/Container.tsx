import { cn } from '@/lib/utils'
import { ReactElement } from 'react'

interface IContainer {
    className?: string
    children?: ReactElement | ReactElement[]
}

const Container = ({ children, className }: IContainer) => {
    return (
        <div className={cn('max-w-7xl mx-auto px-5', className)}>
            {children}
        </div>
    )
}

export default Container
