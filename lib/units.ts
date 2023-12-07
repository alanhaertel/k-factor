import { type VolumeFlowUnits, type MassFlowUnits, type DensityUnits, type ViscosityUnits, type DiameterUnits } from './types'

export const massFlowUnits: MassFlowUnits = {
    'kg/s': 'kg/s',
    'kg/h': 'kg/h',
    'kg/day': 'kg/day',
    'lb/s': 'lb/s',
    'lb/h': 'lb/h',
    'lb/day': 'lb/day',
    'ton/year': 'ton/year'
}

export const volumeFlowUnits: VolumeFlowUnits = {
    'm3/h': 'm³/h',
    'm3/day': 'm³/day',
    'ft3/h': 'ft³/h',
    'ft3/day': 'ft³/day',
    'gal/h': 'gal/h',
    'gal/day': 'gal/day',
    'm3/s': 'm³/s',
    'ft3/s': 'ft³/s',
    'gal/s': 'gal/s'
}

export const densityUnits: DensityUnits = {
    'kg/m3:': 'kg/m³',
    'lb/ft3': 'lb/ft³',
    'g/cm3': 'g/cm³',
    'kg/ft3': 'kg/ft³',
    'lb/m3': 'lb/m³'
}

export const viscosityUnits: ViscosityUnits = {
    cP: 'cP',
    Pas: 'Pa·s',
    'lb/fts': 'lb/ft·s',
    'kg/mh': 'kg/m·h',
    'lb/fth': 'lb/ft·h',
    'kg/ms': 'kg/m·s'
}

export const diameterUnits: DiameterUnits = {
    mm: 'mm',
    cm: 'cm',
    m: 'm',
    in: 'in',
    ft: 'ft'
}
