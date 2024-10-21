import { cn } from '@/lib/utils'

interface ILoader {
    className?: string
}

const Loader = ({ className }: ILoader) => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div
                className={cn(
                    'w-16 h-16 border-4 border-border border-solid border-t-transparent rounded-full animate-spin',
                    className
                )}
            ></div>
        </div>
    )
}

export default Loader
