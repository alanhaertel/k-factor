export type Inputs = {
    threaded90: [number, number, number]
    flanged90: [number, number, number]
    allTypes90: [number, number, number]
    weld190: [number, number, number]
    weld290: [number, number, number]
    weld390: [number, number, number]
    weld490: [number, number, number]
    weld590: [number, number, number]
    allTypesSR45: [number, number, number]
    allTypesLR45: [number, number, number]
    weld145: [number, number, number]
    weld245: [number, number, number]
    screwed180: [number, number, number]
    allTypes180: [number, number, number]
    flanged180: [number, number, number]
    screwedSRTee: [number, number, number]
    flangedTee: [number, number, number]
    screwedLRTee: [number, number, number]
    stubInTee: [number, number, number]
    screwedTeeThrough: [number, number, number]
    stubInTeeThrough: [number, number, number]
    flangedTeeThrough: [number, number, number]
    valve1b: [number, number, number]
    valve09b: [number, number, number]
    valve08b: [number, number, number]
    butterfly: [number, number, number]
    checkSwing: [number, number, number]
    globeStandard: [number, number, number]
    globeAngle: [number, number, number]
    diaphragm: [number, number, number]
    checkLift: [number, number, number]
    checkDisk: [number, number, number]
}
export type Misc = {
    inlet: [number, number]
    contraction: [number, number]
    enlargement: [number, number]
    outlet: [number, number]
}

export type NumericInputs = {
    [K in keyof Inputs]: number;
}

export type Conditions = {
    massFlow: number | null
    viscosity: number | null
    diameter: number | null
    volumetricFlow: number | null
    density: number | null
    roughness: number | null
}

export type ConditionsErrors = {
    massFlow: 'ok' | 'nok'
    viscosity: 'ok' | 'nok'
    diameter: 'ok' | 'nok'
    volumetricFlow: 'ok' | 'nok'
    density: 'ok' | 'nok'
}

export type ConditionsErrorsUpdate = Partial<{
    massFlow: 'ok' | 'nok'
    viscosity: 'ok' | 'nok'
    diameter: 'ok' | 'nok'
    volumetricFlow: 'ok' | 'nok'
    density: 'ok' | 'nok'
}>
