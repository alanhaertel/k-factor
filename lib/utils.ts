import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type NumericInputs, type Inputs, type Conditions, type ConditionsErrors } from './types'
import { useInputStore } from './useInputStore'

export function cn (...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function mapValuesToNumber (inputs: Inputs): NumericInputs {
    return Object.fromEntries(
        Object.entries(inputs).map(([key, value]) => [key, Number(value)])
    ) as NumericInputs
}

export function validateInputs (conditionsData: Conditions, flowType: string) {
    let validation = true
    let messageValidation = ''
    const errors = useInputStore.use.updateConditionsErrors()

    for (const key of Object.keys(conditionsData)) {
        const value = conditionsData[key as keyof Conditions]

        if (key === 'roughness') {
            continue
        }

        if (flowType === 'mass-flow' && ['volumetricFlow', 'density'].includes(key)) {
            continue
        } else if (flowType === 'volumetric-flow' && ['massFlow'].includes(key)) {
            continue
        } else if (value === null) {
            validation = false
            messageValidation = 'Complete all flow conditions inputs'
            errors('nok', key as keyof ConditionsErrors)
            break
        } else if (value === 0) {
            console.log('Error invalid 0')
            messageValidation = 'Zero is not a valid flow condition input'
            validation = false
            break
        }
        // console.log(key, useInputStore.use.conditionsErrors())
    }
    return { validation, messageValidation }
}
