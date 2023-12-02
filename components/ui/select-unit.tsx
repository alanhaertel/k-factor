import type { Units } from '@/lib/types'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './select'

type SelectUnitProps = {
    selectOptions: Units
    onValueChange: (value: string) => void
    value: string
}

export function SelectUnit ({ selectOptions, value, onValueChange }: SelectUnitProps) {
    const entries = Object.entries(selectOptions)

    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className='max-w-[13rem] min-w-[7rem] h-7'>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {entries.map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
