import { create } from 'zustand'
import { createSelectors } from './createSelectors'

type Store = {
    totalK: string
    updateTotalK: (value: string) => void

}

const store = create<Store>((set) => ({
    totalK: '',

    updateTotalK: (value) => { set(() => ({ totalK: value })) }

}))

export const useOutputStore = createSelectors(store)
