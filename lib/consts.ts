import { densityUnits, diameterUnits, massFlowUnits, viscosityUnits, volumeFlowUnits } from './units'

export const firstVolumeFlowUnits = Object.entries(volumeFlowUnits)[0][0]
export const firstDiameterUnits = Object.entries(diameterUnits)[0][0]
export const firstMassFlowUnits = Object.entries(massFlowUnits)[0][0]
export const firstViscosityUnits = Object.entries(viscosityUnits)[0][0]
export const firstDensityUnits = Object.entries(densityUnits)[0][0]
