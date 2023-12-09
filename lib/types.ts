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

export type ConditionsUnits = {
    massFlow: keyof MassFlowUnits
    viscosity: keyof ViscosityUnits
    diameter: keyof DiameterUnits
    volumetricFlow: keyof VolumeFlowUnits
    density: keyof DensityUnits
    roughness: keyof DiameterUnits
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
    roughness: 'ok' | 'nok'
}

export type ConditionsErrorsUpdate = Partial<{
    massFlow: 'ok' | 'nok'
    viscosity: 'ok' | 'nok'
    diameter: 'ok' | 'nok'
    volumetricFlow: 'ok' | 'nok'
    density: 'ok' | 'nok'
}>

export type FlowTypeUnits = {
    'mass-flow': 'Mass'
    'volumetric-flow': 'Volumetric'
}

export type MassFlowUnits = {
    'kg/s': 'kg/s'
    'kg/h': 'kg/h'
    'kg/day': 'kg/day'
    'lb/s': 'lb/s'
    'lb/h': 'lb/h'
    'lb/day': 'lb/day'
    'ton/year': 'ton/year'
}

export type VolumeFlowUnits = {
    'm3/h': 'm³/h'
    'm3/day': 'm³/day'
    'ft3/h': 'ft³/h'
    'ft3/day': 'ft³/day'
    'gal/h': 'gal/h'
    'gal/day': 'gal/day'
    'm3/s': 'm³/s'
    'ft3/s': 'ft³/s'
    'gal/s': 'gal/s'
}

export type DensityUnits = {
    'kg/m3': 'kg/m³'
    'lb/ft3': 'lb/ft³'
    'g/cm3': 'g/cm³'
    'kg/ft3': 'kg/ft³'
    'lb/m3': 'lb/m³'
}

export type ViscosityUnits = {
    cP: 'cP'
    Pas: 'Pa·s'
    'lb/fts': 'lb/ft·s'
    'kg/mh': 'kg/m·h'
    'lb/fth': 'lb/ft·h'
    'kg/ms': 'kg/m·s'
}

export type DiameterUnits = {
    mm: 'mm'
    cm: 'cm'
    m: 'm'
    in: 'in'
    ft: 'ft'
}

export type Units = MassFlowUnits | VolumeFlowUnits | DensityUnits | ViscosityUnits | DiameterUnits | FlowTypeUnits
