import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type LabelProp = {
    children: ReactNode
    className?: string
}

export function InputLabel ({ children, className }: LabelProp) {
    return (
        <p className={cn('text-sm align-middle', className)}>
            {children}
        </p>
    )
}
