import { create } from 'zustand'
import { createSelectors } from './createSelectors'
import { type Misc, type Conditions, type Inputs, type ConditionsErrors } from './types'
import { firstDensityString, firstDiameterString, firstMassFlowString, firstViscosityString, firstVolumeFlowString } from './consts'

type Store = {
    inputs: Inputs
    misc: Misc
    conditions: Conditions
    flowType: string
    conditionsErrors: ConditionsErrors
    updateFlowType: (value: string) => void
    updateInput: (value: string, inputName: keyof Inputs) => void
    updateCondition: (value: string, conditionName: keyof Conditions) => void
    updateMisc: (value: string, miscName: keyof Misc) => void
    updateConditionsErrors: (value: ConditionsErrors) => void
}

const store = create<Store>((set) => ({
    inputs: {
        threaded90: [0, 800, 0.4],
        flanged90: [0, 800, 0.25],
        allTypes90: [0, 800, 0.20],
        weld190: [0, 1000, 1.15],
        weld290: [0, 800, 0.35],
        weld390: [0, 800, 0.3],
        weld490: [0, 800, 0.27],
        weld590: [0, 800, 0.25],
        allTypesSR45: [0, 500, 0.2],
        allTypesLR45: [0, 500, 0.15],
        weld145: [0, 500, 0.25],
        weld245: [0, 500, 0.15],
        screwed180: [0, 1000, 0.6],
        allTypes180: [0, 1000, 0.3],
        flanged180: [0, 1000, 0.35],
        screwedSRTee: [0, 500, 0.7],
        flangedTee: [0, 800, 0.8],
        screwedLRTee: [0, 800, 0.4],
        stubInTee: [0, 1000, 1],
        screwedTeeThrough: [0, 200, 0.1],
        stubInTeeThrough: [0, 100, 0],
        flangedTeeThrough: [0, 150, 0.05],
        valve1b: [0, 300, 0.1],
        valve09b: [0, 500, 0.15],
        valve08b: [0, 1000, 0.25],
        butterfly: [0, 800, 0.25],
        checkSwing: [0, 1500, 1.5],
        globeStandard: [0, 1500, 4],
        globeAngle: [0, 1000, 2],
        diaphragm: [0, 1000, 2],
        checkLift: [0, 2000, 10],
        checkDisk: [0, 1000, 0.5]
    },
    misc: {
        inlet: [0, 0.5],
        contraction: [0, 0.5],
        enlargement: [0, 1],
        outlet: [0, 1]
    },
    conditions: {
        massFlow: [null, firstMassFlowString],
        viscosity: [null, firstViscosityString],
        diameter: [null, firstDiameterString],
        volumetricFlow: [null, firstVolumeFlowString],
        density: [null, firstDensityString],
        roughness: [null, firstDiameterString]
    },
    flowType: 'mass-flow',

    conditionsErrors: {
        massFlow: 'ok',
        viscosity: 'ok',
        diameter: 'ok',
        volumetricFlow: 'ok',
        density: 'ok'
    },

    updateFlowType: (value) => { set(() => ({ flowType: value })) },
    updateCondition: (value, conditionName) => {
        if (value.trim() === '') {
            set((state) => ({ conditions: { ...state.conditions, [conditionName]: null } }))
        } else {
            set((state) => ({ conditions: { ...state.conditions, [conditionName]: parseFloat(value) } }))
        }
    },
    updateInput: (value, inputName) => {
        if (value.trim() === '') {
            value = '0'
        }
        set((state) => ({ inputs: { ...state.inputs, [inputName]: [parseFloat(value), state.inputs[inputName][1], state.inputs[inputName][2]] } }))
    },
    updateMisc: (value, miscName) => {
        if (value.trim() === '') {
            value = '0'
        }
        set((state) => ({ misc: { ...state.misc, [miscName]: [parseFloat(value), state.misc[miscName][1]] } }))
    },
    updateConditionsErrors: (values: ConditionsErrors) => {
        set(() => ({ conditionsErrors: values }))
    }
}))

export const useInputStore = createSelectors(store)
