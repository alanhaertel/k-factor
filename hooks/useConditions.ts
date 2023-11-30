import { type Conditions } from '@/lib/types'
import { useInputStore } from '@/lib/useInputStore'

export const useConditions = (keys: Array<keyof Conditions>) => {
    const inputStore = useInputStore

    const conditionsValues = keys.reduce<Partial<Record<keyof Conditions, string | null>>>((values, key) => {
        values[key] = inputStore.use.conditions()[key]?.toString() ?? ''
        return values
    }, {}) as Record<keyof Conditions, string>

    return conditionsValues
}
