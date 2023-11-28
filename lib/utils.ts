import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type NumericInputs, type Inputs, type Conditions } from './types'

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

    for (const key of Object.keys(conditionsData)) {
        const value = conditionsData[key as keyof Conditions]

        if (flowType === 'mass-flow' && ['volumetricFlow', 'density'].includes(key)) {
            continue
        } else if (flowType === 'volumetric-flow' && ['massFlow'].includes(key)) {
            continue
        } else if (value === null) {
            console.log('Complete all the inputs')
            validation = false
            messageValidation = 'Complete all flow conditions inputs'
            break
        } else if (value === 0) {
            console.log('Error invalid 0')
            messageValidation = 'Zero is not a valid flow condition input'
            validation = false
            break
        }
        console.log(key, validation)
    }
    console.log('Validated?', validation)
    return { validation, messageValidation }
}
