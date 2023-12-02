import { type Measurement } from './type'

class Converter<T extends Measurement> {
    private readonly definitions: T
    private readonly val: number
    private fromUnit: MeasurementUnits<T> | null = null

    constructor (numerator: number, definitions: T) {
        this.definitions = definitions
        this.val = numerator
    }

    from<U extends MeasurementUnits<T>>(fromUnit: U): Converter<T> {
        this.checkUnit(fromUnit)
        this.fromUnit = fromUnit
        return this
    }

    to<U extends MeasurementUnits<T>>(toUnit: U): number {
        if (!this.fromUnit) {
            throw new Error('Please specify the "from" unit using the from() method before calling to().')
        }
        this.checkUnit(toUnit)

        const toValue = this.getUnit(toUnit)
        const fromValue = this.getUnit(this.fromUnit)

        const result = this.val * fromValue / toValue
        return result
    }

    private getUnit (unit: MeasurementUnits<T>): number {
        const value = this.definitions.units[unit].convertValue
        return value
    }

    private checkUnit (unit: MeasurementUnits<T>): void {
        const availableUnits = Object.keys(this.definitions.units) as Array<MeasurementUnits<T>>

        if (!availableUnits.includes(unit)) {
            throw new Error(`Invalid unit "${unit}". Available units: ${availableUnits.join(', ')}`)
        }
    }
}

type MeasurementUnits<T extends Measurement> = T extends { units: infer U } ? keyof U : never

type ExtractMeasurement<T extends Measurement, U extends MeasurementUnits<T>> = T extends { units: infer Units }
    ? { baseUnit: string, units: { [P in U]: Units[P] } }
    : never

const createConverter = <T extends Measurement>(definitions: T) => (val: number) => new Converter(val, definitions)

export default createConverter
