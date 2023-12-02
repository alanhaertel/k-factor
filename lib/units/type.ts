export type UnitsValues = {
    name: string
    convertValue: number
}

export type VoltageUnits = {
    V: UnitsValues
    mV: UnitsValues
    kV: UnitsValues
}

export type Voltage = {
    baseUnit: 'V'
    // transform: (val: number) => number;
    units: VoltageUnits
}

export type MassFlowUnits = {
    'kg/s': UnitsValues
    'kg/h': UnitsValues
    'lb/day': UnitsValues
    'g/s': UnitsValues
    'lb/h': UnitsValues
    'ton/day': UnitsValues
    'oz/min': UnitsValues
}

export type MassFlow = {
    baseUnit: 'kg/s'
    // transform: (val: number) => number;
    units: MassFlowUnits
}

export type Measurement = Voltage | MassFlow
// export type MeasurementUnits = keyof VoltageUnits | keyof MassFlowUnits
