import { type Inputs } from '@/lib/types'
import { useInputStore } from '@/lib/useInputStore'

export const useInputs = (keys: Array<keyof Inputs>) => {
    const inputStore = useInputStore

    const inputsValues = keys.reduce<Partial<Record<keyof Inputs, string>>>((values, key) => {
        const inputValue = inputStore.use.inputs()[key][0]?.toString()
        values[key] = inputValue === '0' ? '' : inputValue
        return values
    }, {}) as Record<keyof Inputs, string>

    return inputsValues
}
