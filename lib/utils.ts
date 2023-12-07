import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type Conditions, type ConditionsErrors } from './types'
import { z } from 'zod'

export function cn (...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function validateInputs (conditionsData: Conditions, flowType: string) {
    let validation = true
    let messageValidation = ''

    const ConditionsSchema = z.discriminatedUnion('flow-type', [
        z.object({
            'flow-type': z.literal('mass-flow'),
            data: z.object({
                massFlow: z.number().positive(),
                viscosity: z.number().positive(),
                diameter: z.number().positive(),
                roughness: z.number().nonnegative().nullable().transform(val => val ?? 0)
            })
        }),
        z.object({
            'flow-type': z.literal('volumetric-flow'),
            data: z.object({
                volumetricFlow: z.number().positive(),
                density: z.number().positive(),
                viscosity: z.number().positive(),
                diameter: z.number().positive(),
                roughness: z.number().nonnegative().nullable().transform(val => val ?? 0)
            })
        })
    ])

    const parsedConditions = ConditionsSchema.safeParse({ 'flow-type': flowType, data: conditionsData })
    console.log(parsedConditions)
    if (!parsedConditions.success) {
        console.log(parsedConditions.error.format())
    }

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

const mock = {
    success: false,
    error: {
        issues: [
            {
                code: 'invalid_type',
                expected: 'number',
                received: 'null',
                path: [
                    'data',
                    'massFlow'
                ],
                message: 'Expected number, received null'
            },
            {
                code: 'invalid_type',
                expected: 'number',
                received: 'null',
                path: [
                    'data',
                    'viscosity'
                ],
                message: 'Expected number, received null'
            },
            {
                code: 'invalid_type',
                expected: 'number',
                received: 'null',
                path: [
                    'data',
                    'diameter'
                ],
                message: 'Expected number, received null'
            }
        ],
        name: 'ZodError'
    },
    _error: {
        issues: [
            {
                code: 'invalid_type',
                expected: 'number',
                received: 'null',
                path: [
                    'data',
                    'massFlow'
                ],
                message: 'Expected number, received null'
            },
            {
                code: 'invalid_type',
                expected: 'number',
                received: 'null',
                path: [
                    'data',
                    'viscosity'
                ],
                message: 'Expected number, received null'
            },
            {
                code: 'invalid_type',
                expected: 'number',
                received: 'null',
                path: [
                    'data',
                    'diameter'
                ],
                message: 'Expected number, received null'
            }
        ],
        name: 'ZodError'
    }
}
