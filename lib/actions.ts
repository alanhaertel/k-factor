'use server'

import { type Misc, type Conditions, type Inputs, type ConditionsUnits } from './types'
import { z } from 'zod'
import { density, length, massFlow, viscosity, volumetricFlow } from 'engineering-unit-converter'

type VerifiedConditions = {
    massFlow: number
    viscosity: number
    diameter: number
    roughness: number
}

export async function caclulate (i: Inputs, c: Conditions, u: ConditionsUnits, m: Misc, flowType: string) {
    let kSum = 0
    let conditions: VerifiedConditions

    const ConditionsSchema = z.discriminatedUnion('flow-type', [
        z.object({
            'flow-type': z.literal('mass-flow'),
            data: z.object({
                massFlow: z.number().transform((val) => massFlow(val).from(u.massFlow).to('kg/h')),
                viscosity: z.number().transform((val) => viscosity(val).from(u.viscosity).to('cP')),
                diameter: z.number().transform((val) => length(val).from(u.diameter).to('mm')),
                roughness: z.number().nullable().transform((val) => length(val ?? 0).from(u.roughness).to('mm'))
            })
        }),
        z.object({
            'flow-type': z.literal('volumetric-flow'),
            data: z.object({
                volumetricFlow: z.number().transform((val) => volumetricFlow(val).from(u.volumetricFlow).to('m3/h')),
                density: z.number().transform((val) => density(val).from(u.density).to('kg/m3')),
                viscosity: z.number().transform((val) => viscosity(val).from(u.viscosity).to('cP')),
                diameter: z.number().transform((val) => length(val).from(u.diameter).to('mm')),
                roughness: z.number().nullable().transform((val) => length(val ?? 0).from(u.roughness).to('mm'))
            })
        })
    ])

    const parsedConditions = ConditionsSchema.parse({ 'flow-type': flowType, data: c })
    if (parsedConditions['flow-type'] === 'mass-flow') {
        conditions = {
            massFlow: parsedConditions.data.massFlow,
            viscosity: parsedConditions.data.viscosity,
            diameter: parsedConditions.data.diameter,
            roughness: parsedConditions.data.roughness
        }
    } else {
        conditions = {
            massFlow: parsedConditions.data.density * parsedConditions.data.volumetricFlow,
            viscosity: parsedConditions.data.viscosity,
            diameter: parsedConditions.data.diameter,
            roughness: parsedConditions.data.roughness
        }
    }

    const re = reynolds(conditions)
    const f = fanning(re, conditions.diameter, conditions.roughness)

    for (const k of Object.keys(i)) {
        const k1 = i[k as keyof Inputs][1] / re
        const kinf = i[k as keyof Inputs][2] * (1 + 1 / (conditions.diameter / 25.4))

        kSum += i[k as keyof Inputs][0] * (k1 + kinf)
    }

    for (const k of Object.keys(m)) {
        const kinfmisc = m[k as keyof Misc][1]

        kSum += m[k as keyof Misc][0] * kinfmisc
    }

    const totalK = +kSum.toFixed(2)
    const leq = +(totalK * (conditions.diameter / 1000) / 4 / f).toFixed(2)

    return { totalK, leq }
}

function reynolds (c: VerifiedConditions) {
    const re = (c.massFlow / 3600 / (Math.PI / 4 * ((c.diameter) / 1000) ** 2)) * (c.diameter) / c.viscosity

    return re
}

function fanning (re: number, diameter: number, roughness: number) {
    const f =
    (
        (16 / re) ** 12 +
        1 / (
            ((2.457 / (2 ** 0.5)) * Math.log((7 / re) ** 0.9 + 0.27 * roughness / diameter)) ** 16 +
          (37530 / (2 ** 0.5) / re) ** 16
        )
    ) ** (1.5 / 12)

    return f
}
