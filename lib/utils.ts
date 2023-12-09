import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type Conditions, type ConditionsErrors } from './types'
import { z } from 'zod'

export function cn (...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function validateInputs (conditionsData: Conditions, flowType: string) {
    let validation = true
    let errorMessage = ''

    const errors: ConditionsErrors = {
        massFlow: 'ok',
        viscosity: 'ok',
        diameter: 'ok',
        volumetricFlow: 'ok',
        density: 'ok',
        roughness: 'ok'
    }

    const ConditionsSchema = z.discriminatedUnion('flow-type', [
        z.object({
            'flow-type': z.literal('mass-flow'),
            data: z.object({
                massFlow: z.number({ invalid_type_error: 'Fill Mass Flow Input.' }).positive({ message: 'Mass Flow must be greater than 0.' }),
                viscosity: z.number({ invalid_type_error: 'Fill Viscosity Input.' }).positive({ message: 'Viscosity must be greater than 0.' }),
                diameter: z.number({ invalid_type_error: 'Fill Diameter Input.' }).positive({ message: 'Diameter must be greater than 0.' }),
                roughness: z.number().nonnegative({ message: 'Roughness must be a positive number.' }).nullable().transform(val => val ?? 0)
            })
        }),
        z.object({
            'flow-type': z.literal('volumetric-flow'),
            data: z.object({
                volumetricFlow: z.number({ invalid_type_error: 'Fill Volumetric Flow Input.' }).positive({ message: 'Mass Flow must be greater than 0.' }),
                density: z.number({ invalid_type_error: 'Fill Density Input.' }).positive({ message: 'Density must be greater than 0.' }),
                viscosity: z.number({ invalid_type_error: 'Fill Viscosiyu Input.' }).positive({ message: 'Viscosity must be greater than 0.' }),
                diameter: z.number({ invalid_type_error: 'Fill Diameter Input.' }).positive({ message: 'Diameter must be greater than 0.' }),
                roughness: z.number().nonnegative({ message: 'Roughness must be greater than 0.' }).nullable().transform(val => val ?? 0)
            })
        })
    ])

    const parsedConditions = ConditionsSchema.safeParse({ 'flow-type': flowType, data: conditionsData })

    if (!parsedConditions.success) {
        validation = false

        const errorData = parsedConditions.error.flatten().fieldErrors.data
        if (Array.isArray(errorData)) {
            for (const errorItem of errorData) {
                errorMessage += `● ${errorItem}\n`
            }
        }

        const errorNames = parsedConditions.error.format().data
        Object.keys(errorNames ?? {}).forEach((key) => {
            if (key !== '_errors' && key in errors) {
                errors[key as keyof ConditionsErrors] = 'nok'
            }
        })
    }

    return { validation, errorMessage, errors }
}
