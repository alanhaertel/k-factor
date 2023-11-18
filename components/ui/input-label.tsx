import type { ReactNode } from 'react'

type LabelProp = {
    children: ReactNode
}

export function InputLabel ({ children }: LabelProp) {
    return (
        <p className='text-sm'>
            {children}
        </p>
    )
}
