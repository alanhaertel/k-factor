import { type VolumeFlowUnits, type MassFlowUnits, type DensityUnits, type ViscosityUnits, type DiameterUnits } from './types'

export const massFlowUnits: MassFlowUnits = {
    kgs: 'kg/s',
    kgh: 'kg/h',
    kgday: 'kg/day',
    lbs: 'lb/s',
    lbh: 'lb/h',
    lbday: 'lb/day',
    tnyear: 'tonne/year'
}

export const volumeFlowUnits: VolumeFlowUnits = {
    m3h: 'm³/h',
    m3day: 'm³/day',
    ft3h: 'ft³/h',
    ft3day: 'ft³/day',
    galh: 'gal/h',
    galday: 'gal/day',
    m3s: 'm³/s',
    ft3s: 'ft³/s',
    gals: 'gal/s'
}

export const densityUnits: DensityUnits = {
    kgm3: 'kg/m³',
    lbft3: 'lb/ft³',
    gmcm3: 'g/cm³',
    kgft3: 'kg/ft³',
    lbm3: 'lb/m³'
}

export const viscosityUnits: ViscosityUnits = {
    cP: 'cP',
    PaS: 'Pa·s',
    lbftsh: 'lb·ft/s·h',
    kgmsh: 'kg/m·s·h',
    lbftsft: 'lb·ft/s·ft',
    kgmsm: 'kg/m·s·m'
}

export const diameterUnits: DiameterUnits = {
    millimeter: 'mm',
    centimeter: 'cm',
    meter: 'm',
    inch: 'in',
    foot: 'ft'
}
