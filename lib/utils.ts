import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type NumericInputs, type Inputs, type Conditions, type ConditionsErrors } from './types'

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
    const errors: ConditionsErrors = {
        massFlow: 'ok',
        viscosity: 'ok',
        diameter: 'ok',
        volumetricFlow: 'ok',
        density: 'ok'
    }

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
            messageValidation = 'Complete flow conditions inputs'
            errors[key as keyof ConditionsErrors] = 'nok'
        } else if (value === 0) {
            messageValidation = 'Zero is not a valid flow condition input'
            validation = false
            errors[key as keyof ConditionsErrors] = 'nok'
        }
    }
    return { validation, messageValidation, errors }
}
