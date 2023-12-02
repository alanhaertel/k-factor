import utils from './convertet'
type VoltageUnit = {
    name: {
        singular: string
        plural: string
    }
    to_anchor: number
}

export type Voltage = {
    unit: {
        baseUnit: 'V'
        transform: (val: number) => number
        V: VoltageUnit
        mV: VoltageUnit
        kV: VoltageUnit
    }
}

const baseUnit = 1

const voltage: Voltage = {
    unit: {
        baseUnit: 'V',
        transform: (val) => { return val * baseUnit },
        V: {
            name: {
                singular: 'Volt',
                plural: 'Volts'
            },
            to_anchor: 1
        },
        mV: {
            name: {
                singular: 'Millivolt',
                plural: 'Millivolts'
            },
            to_anchor: 0.001
        },
        kV: {
            name: {
                singular: 'Kilovolt',
                plural: 'Kilovolts'
            },
            to_anchor: 1000
        }
    }
}

export default utils(voltage)
