import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type VolumeFlowUnits, type Conditions, type ConditionsErrors, type MassFlowUnits, type DensityUnits, type ViscosityUnits, type DiameterUnits } from './types'

export function cn (...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
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
        const value = conditionsData[key as keyof Conditions][0]

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

export function convertMassFlow (value: number | null, unit: MassFlowUnits[keyof MassFlowUnits]) {
    const uv = {
        'kg/s': 1, // reference unit
        'kg/h': 3600,
        'kg/day': 86400,
        'lb/s': 2.20462,
        'lb/h': 7936.64,
        'lb/day': 189919.9,
        'tonne/year': 31.5569
    }
    if (value === null) {
        throw new Error('Error')
    } else {
        const conversion = uv[unit] * value
        return conversion
    }
}

export function convertVolumeFlow (value: number | null, unit: VolumeFlowUnits[keyof VolumeFlowUnits]) {
    const uv = {
        'm³/h': 1, // reference unit
        'm³/day': 24,
        'ft³/h': 35.315,
        'ft³/day': 1415.8,
        'gal/h': 264.172,
        'gal/day': 11001.2,
        'm³/s': 0.000277778,
        'ft³/s': 0.000810714,
        'gal/s': 0.000004403
    }

    if (value === null) {
        throw new Error('Error')
    } else {
        const conversion = uv[unit] * value
        return conversion
    }
}

export function convertDensity (value: number | null, unit: DensityUnits[keyof DensityUnits]) {
    const uv = {
        'kg/m³': 1, // reference unit
        'lb/ft³': 0.0624279,
        'g/cm³': 0.001,
        'kg/ft³': 0.0624279,
        'lb/m³': 0.0000624279
    }

    if (value === null) {
        throw new Error('Error')
    } else {
        const conversion = uv[unit] * value
        return conversion
    }
}

export function convertViscosity (value: number | null, unit: ViscosityUnits[keyof ViscosityUnits]) {
    const uv = {
        cP: 1, // reference unit
        // eslint-disable-next-line
        'Pa·s': 0.001,
        'lb·ft/s·h': 2419.088,
        'kg/m·s·h': 1,
        'lb·ft/s·ft': 0.003493,
        'kg/m·s·m': 1
    }

    if (value === null) {
        throw new Error('Error')
    } else {
        const conversion = uv[unit] * value
        return conversion
    }
}

export function convertDiameter (value: number | null, unit: DiameterUnits[keyof DiameterUnits]) {
    const uv = {
        mm: 1, // reference unit
        cm: 0.1,
        m: 0.001,
        in: 0.0393701,
        ft: 0.00328084
    }

    if (value === null) {
        throw new Error('Error')
    } else {
        const conversion = uv[unit] * value
        return conversion
    }
}
