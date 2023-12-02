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
    massFlow: [number | null, MassFlowUnits[keyof MassFlowUnits]]
    viscosity: [number | null, ViscosityUnits[keyof ViscosityUnits]]
    diameter: [number | null, DiameterUnits[keyof DiameterUnits]]
    volumetricFlow: [number | null, VolumeFlowUnits[keyof VolumeFlowUnits]]
    density: [number | null, DensityUnits[keyof DensityUnits]]
    roughness: [number | null, DiameterUnits[keyof DiameterUnits]]
}

export type ConditionsValues = {
    massFlow: number
    viscosity: number
    diameter: number
    volumetricFlow: number
    density: number
    roughness: number
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

export type FlowTypeUnits = {
    'mass-flow': 'Mass'
    'volumetric-flow': 'Volumetric'
}

export type MassFlowUnits = {
    kgs: 'kg/s'
    kgh: 'kg/h'
    kgday: 'kg/day'
    lbs: 'lb/s'
    lbh: 'lb/h'
    lbday: 'lb/day'
    tnyear: 'tonne/year'
}

export type VolumeFlowUnits = {
    m3h: 'm³/h'
    m3day: 'm³/day'
    ft3h: 'ft³/h'
    ft3day: 'ft³/day'
    galh: 'gal/h'
    galday: 'gal/day'
    m3s: 'm³/s'
    ft3s: 'ft³/s'
    gals: 'gal/s'
}

export type DensityUnits = {
    kgm3: 'kg/m³'
    lbft3: 'lb/ft³'
    gmcm3: 'g/cm³'
    kgft3: 'kg/ft³'
    lbm3: 'lb/m³'
}

export type ViscosityUnits = {
    cP: 'cP'
    PaS: 'Pa·s'
    lbftsh: 'lb·ft/s·h'
    kgmsh: 'kg/m·s·h'
    lbftsft: 'lb·ft/s·ft'
    kgmsm: 'kg/m·s·m'
}

export type DiameterUnits = {
    millimeter: 'mm'
    centimeter: 'cm'
    meter: 'm'
    inch: 'in'
    foot: 'ft'
}

export type Units = MassFlowUnits | VolumeFlowUnits | DensityUnits | ViscosityUnits | DiameterUnits | FlowTypeUnits
