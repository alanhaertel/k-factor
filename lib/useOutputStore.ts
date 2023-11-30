import { create } from 'zustand'
import { createSelectors } from './createSelectors'

type Store = {
    totalK: string
    leq: string
    updateTotalK: (value: string) => void
    updateLeq: (value: string) => void

}

const store = create<Store>((set) => ({
    totalK: '',
    leq: '',

    updateTotalK: (value) => { set(() => ({ totalK: value })) },
    updateLeq: (value) => { set(() => ({ leq: value })) }

}))

export const useOutputStore = createSelectors(store)
