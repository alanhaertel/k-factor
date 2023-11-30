import { type Misc } from '@/lib/types'
import { useInputStore } from '@/lib/useInputStore'

export const useMisc = (keys: Array<keyof Misc>) => {
    const inputStore = useInputStore

    const miscValues = keys.reduce<Partial<Record<keyof Misc, string>>>((values, key) => {
        const inputValue = inputStore.use.misc()[key][0]?.toString()
        values[key] = inputValue === '0' ? '' : inputValue
        return values
    }, {}) as Record<keyof Misc, string>

    return miscValues
}
