'use server'

import { type Misc, type Conditions, type Inputs } from './types'

export async function caclulate (i: Inputs, c: Conditions, m: Misc, flowType: string) {
    let k1Sum = 0
    let kInfSum = 0
    let kMiscSum = 0
    let messageServer = 'Successfully Calculated'

    const re = reynolds(c, flowType)
    let f: number
    if (re === 0) {
        messageServer = 'Reynolds number is 0, calculation cannot proceed.'
        throw new Error(messageServer)
    } else {
        // @ts-expect-error diameter already checked
        f = fanning(re, c.diameter, c.roughness ?? 0)
    }

    for (const k of Object.keys(i)) {
        const valuek1 = i[k as keyof Inputs][0] * i[k as keyof Inputs][1]
        const valueinf = i[k as keyof Inputs][0] * i[k as keyof Inputs][2]

        k1Sum += valuek1
        kInfSum += valueinf
    }

    for (const k of Object.keys(m)) {
        const valuemisc = m[k as keyof Misc][0] * m[k as keyof Misc][1]

        kMiscSum += valuemisc
    }

    const k1 = k1Sum / re
    // @ts-expect-error diameter already checked
    const k2 = kInfSum * (1 + 1 / (c.diameter)) + kMiscSum
    const totalK = (k1 + k2).toFixed(2)
    // @ts-expect-error diameter already checked
    const leq = (totalK * (c.diameter * 25.4) / 1000 / 4 / f).toFixed(2)

    return { totalK, leq, messageServer }
}

function reynolds (c: Conditions, flowType: string) {
    let flow: number
    let re: number
    console.log(c, flowType)
    if (flowType === 'mass-flow' && c.diameter != null && c.viscosity != null && c.massFlow != null) {
        flow = c.massFlow
        re = (flow / 3600 / (Math.PI / 4 * ((c.diameter * 25.4) / 1000) ** 2)) * (c.diameter * 25.4) / c.viscosity
    } else if (flowType === 'volumetric-flow' && c.diameter != null && c.viscosity != null && c.volumetricFlow != null && c.density != null) {
        flow = c.volumetricFlow * c.density
        re = (flow / 3600 / (Math.PI / 4 * ((c.diameter * 25.4) / 1000) ** 2)) * (c.diameter * 25.4) / c.viscosity
    } else {
        re = 0
    }

    return re
}

function fanning (re: number, diameter: number, roughness: number) {
    const f =
    (
        (16 / re) ** 12 + (1 / ((2.457 / 2 ** 0.5 * Math.log((7 / re) ** 0.9 + 0.27 * roughness ?? 0 / (diameter * 25.4))) ** 16 + (37530 / 2 ** 0.5 / re) ** 16)) ** 1.5
    ) ** (1 / 12)

    return f
}
