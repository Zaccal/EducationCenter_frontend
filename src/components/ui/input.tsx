import * as React from 'react'

import { cn } from '@/lib/utils'
import { LucideProps } from 'lucide-react'

type TypeVariant = 'error' | 'defualt' | 'goust'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    Icon?: React.ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
    >
    variant?: TypeVariant
}

const getVariantInputCSS = (variant: TypeVariant) => {
    switch (variant) {
        case 'error':
            return 'bg-red-500 border-red-700 placeholder:text-red-300'
        case 'goust':
            return 'border-none bg-transparent pl-0'
        default:
            break
    }
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, Icon, variant = 'defualt', ...props }, ref) => {
        return (
            <div className={cn('relative flex items-center', className)}>
                {Icon && (
                    <Icon
                        className={cn(
                            'absolute left-3 h-5 w-5 text-muted-foreground',
                            variant === 'error' ? 'text-red-300' : ''
                        )}
                    />
                )}
                <input
                    type={type}
                    className={cn(
                        'h-10 w-full rounded-md border border-input bg-background px-6 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50',
                        Icon && 'px-10',
                        getVariantInputCSS(variant)
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        )
    }
)
Input.displayName = 'Input'

export { Input }
