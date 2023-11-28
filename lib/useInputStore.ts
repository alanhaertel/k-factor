import { create } from 'zustand'
import { createSelectors } from './createSelectors'
import { type Misc, type Conditions, type Inputs } from './types'

type Store = {
    inputs: Inputs
    misc: Misc
    conditions: Conditions
    flowType: string
    updateFlowType: (value: string) => void
    updateInput: (value: string, inputName: keyof Inputs) => void
    updateCondition: (value: string, conditionName: keyof Conditions) => void
    updateMisc: (value: string, miscName: keyof Misc) => void

}

const store = create<Store>((set) => ({
    inputs: {
        threaded90: [0, 800, 0.4],
        flanged90: [0, 800, 0.25],
        allTypes90: [0, 800, 0.25],
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
        allTypes180: [0, 1000, 0.35],
        flanged180: [0, 1000, 0.3],
        screwedSRTee: [0, 500, 0.7],
        flangedTee: [0, 200, 0.1],
        screwedLRTee: [0, 800, 0.4],
        stubInTee: [0, 150, 0.05],
        screwedTeeThrough: [0, 1500, 1.5],
        stubInTeeThrough: [0, 160, 0.05],
        flangedTeeThrough: [0, 1000, 0.8],
        valve1b: [0, 800, 0.25],
        valve09b: [0, 1000, 0.5],
        valve08b: [0, 1500, 1.5],
        butterfly: [0, 800, 0.25],
        checkSwing: [0, 1000, 0.5],
        globeStandard: [0, 2000, 10],
        globeAngle: [0, 1500, 1.5],
        diaphragm: [0, 800, 0.25],
        checkLift: [0, 1000, 0.5],
        checkDisk: [0, 160, 0.5]
    },
    misc: {
        inlet: [0, 0.5],
        contraction: [0, 0.5],
        enlargement: [0, 1],
        outlet: [0, 1]
    },
    conditions: {
        massFlow: null,
        viscosity: null,
        diameter: null,
        volumetricFlow: null,
        density: null
    },
    flowType: 'mass-flow',

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
    }
}))

export const useInputStore = createSelectors(store)
