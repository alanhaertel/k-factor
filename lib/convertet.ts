import { type Voltage } from './voltage'

class Converter {
    private readonly definitions: Voltage // Declare the definitions property
    private readonly val: number
    constructor (numerator: number, definitions: Voltage) {
        this.definitions = definitions
        this.val = numerator
    }

    from (from) {
        if (this.destination) {
            throw new Error('.from must be called before .to')
        }

        this.origin = this.getUnit(from)

        if (!this.origin) {
            this.throwUnsupportedUnitError(from)
        }

        return this
    }

    to (to) {
        if (!this.origin) {
            throw new Error('.to must be called after .from')
        }

        this.destination = this.getUnit(to)

        let result

        if (!this.destination) {
            this.throwUnsupportedUnitError(to)
        }

        if (this.origin.abbr === this.destination.abbr) {
            return { value: this.val, ...this.describe(this.destination.abbr) }
        }

        result = this.val * this.origin.unit.to_anchor

        if (this.origin.unit.anchor_shift) {
            result -= this.origin.unit.anchor_shift
        }

        if (this.origin.system !== this.destination.system) {
            result = this.definitions[this.origin.system].transform(result)
        }

        if (this.destination.unit.anchor_shift !== undefined) {
            result += this.destination.unit.anchor_shift
        }

        return { value: result / this.destination.unit.to_anchor, ...this.describe(this.destination.abbr) }
    }

    getUnit (abbr) {
        const systemNames = Object.keys(this.definitions)
        console.log(this.definitions)
        console.log(systemNames)
        const found = systemNames
            .map(systemName => {
                if (this.definitions[systemName][abbr]) {
                    return {
                        abbr,
                        system: systemName,
                        unit: this.definitions[systemName][abbr]
                    }
                }
            })
            .filter(item => item !== undefined)

        return Array.isArray(found) ? found[0] : undefined
    }

    list () {
        return this.possibilities().map(abbr => this.describe(abbr))
    }

    throwUnsupportedUnitError (what) {
        throw new Error(`Unsupported unit ${what}`)
    }

    describe (abbr) {
        if (!abbr) {
            throw new Error('You must select a unit')
        }

        const unit = this.getUnit(abbr)

        return {
            unit: unit.abbr,
            system: unit.system,
            singular: unit.unit.name.singular,
            plural: unit.unit.name.plural
        }
    }

    possibilities () {
        return Array.prototype.concat(
            ...Object.keys(this.definitions).map(systemName => Object.keys(this.definitions[systemName]).splice(2))
        )
    }
}

const createConverter = definitions => val => new Converter(val, definitions)

export default createConverter
