import { cn } from '@/lib/utils'
import { Label } from '../ui/label'

interface IErrorLabel {
    message?: string | string[] | undefined[] | (string | undefined)[] | null
    htmlFor: string
    className?: string
}

const ErrorLabel = ({ message, className, htmlFor }: IErrorLabel) => {
    if (!message) return <></>

    return (
        <>
            <Label
                htmlFor={htmlFor}
                className={cn('text-red-500 font-bold', className)}
            >
                {Array.isArray(message) ? (
                    <div className="pb-3 flex flex-col gap-3">
                        {message.map((data) => {
                            return data && <span key={data}>* {data}</span>
                        })}
                    </div>
                ) : (
                    message
                )}
            </Label>
        </>
    )
}

export default ErrorLabel
