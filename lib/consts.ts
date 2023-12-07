import { type Inputs, type Conditions, type Misc, type VolumeFlowUnits, type DiameterUnits, type MassFlowUnits, type ViscosityUnits, type DensityUnits } from './types'
import { densityUnits, diameterUnits, massFlowUnits, viscosityUnits, volumeFlowUnits } from './units'

export const firstVolumeFlowUnits = Object.entries(volumeFlowUnits)[0][0]
export const firstDiameterUnits = Object.entries(diameterUnits)[0][0]
export const firstMassFlowUnits = Object.entries(massFlowUnits)[0][0]
export const firstViscosityUnits = Object.entries(viscosityUnits)[0][0]
export const firstDensityUnits = Object.entries(densityUnits)[0][0]

export const firstVolumeFlowString = Object.keys(volumeFlowUnits)[0] as keyof VolumeFlowUnits
export const firstDiameterString = Object.keys(diameterUnits)[0] as keyof DiameterUnits
export const firstMassFlowString = Object.keys(massFlowUnits)[0] as keyof MassFlowUnits
export const firstViscosityString = Object.keys(viscosityUnits)[0] as keyof ViscosityUnits
export const firstDensityString = Object.keys(densityUnits)[0] as keyof DensityUnits

export const conditionsKeys: Array<keyof Conditions> = ['massFlow', 'viscosity', 'diameter', 'volumetricFlow', 'density', 'roughness']
export const inputsKeys: Array<keyof Inputs> = ['threaded90', 'flanged90', 'allTypes90', 'weld190', 'weld290', 'weld390', 'weld490', 'weld590', 'allTypesSR45', 'allTypesLR45', 'weld145', 'weld245', 'screwed180', 'allTypes180', 'flanged180', 'screwedSRTee', 'flangedTee', 'screwedLRTee', 'stubInTee', 'screwedTeeThrough', 'stubInTeeThrough', 'flangedTeeThrough', 'valve1b', 'valve09b', 'valve08b', 'butterfly', 'checkSwing', 'globeStandard', 'globeAngle', 'diaphragm', 'checkLift', 'checkDisk']
export const miscKeys: Array<keyof Misc> = ['inlet', 'contraction', 'enlargement', 'outlet']
