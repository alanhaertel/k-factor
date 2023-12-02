'use server'

import voltageConverter from './convertet'
import converter from './convertet'
import { type Misc, type Conditions, type Inputs, type ConditionsValues } from './types'
import voltage from './voltage'

export async function caclulate (i: Inputs, c: Conditions, m: Misc, flowType: string) {
    let kSum = 0
    let messageServer = 'Successfully Calculated'

    const massFlow = 35
    const volumetricFlow = 30
    const density = 35
    const viscosity = 35
    const diameter = 35
    const roughness = 35

    const conditions = {
        massFlow,
        volumetricFlow,
        density,
        viscosity,
        diameter,
        roughness
    }

    const re = reynolds(conditions, flowType)
    let f: number
    if (re === 0) {
        messageServer = 'Reynolds number is 0, calculation cannot proceed.'
        throw new Error(messageServer)
    } else {
        f = fanning(re, conditions.diameter, conditions.roughness ?? 0)
    }

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

    const newValue = voltage(20).from('V').to('kV')
    console.log('Voltage conversion:', newValue)

    return { totalK, leq, messageServer }
}

function reynolds (c: ConditionsValues, flowType: string) {
    let flow: number
    let re: number
    if (flowType === 'mass-flow' && c.diameter != null && c.viscosity != null && c.massFlow != null) {
        flow = c.massFlow
        re = (flow / 3600 / (Math.PI / 4 * ((c.diameter) / 1000) ** 2)) * (c.diameter) / c.viscosity
    } else if (flowType === 'volumetric-flow' && c.diameter != null && c.viscosity != null && c.volumetricFlow != null && c.density != null) {
        flow = c.volumetricFlow * c.density
        re = (flow / 3600 / (Math.PI / 4 * ((c.diameter) / 1000) ** 2)) * (c.diameter) / c.viscosity
    } else {
        re = 0
    }
    console.log('reynolds', re)
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
    console.log('fanning', f)
    return f
}
