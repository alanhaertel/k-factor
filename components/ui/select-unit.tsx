import type { Units } from '@/lib/units'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './select'

type SelectUnitProps = {
    selectOptions: Units
}

export function SelectUnit ({ selectOptions }: SelectUnitProps) {
    const entries = Object.entries(selectOptions)

    return (
        <Select>
            <SelectTrigger className='max-w-[13rem] min-w-[7rem] h-7'>
                <SelectValue placeholder={entries[0][1]}/>
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
