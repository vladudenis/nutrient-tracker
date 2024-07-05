import { create } from 'zustand'

type Store = {
    session: any | null
    setSession: (session: any) => void

    nutrients: any[] | null
    setNutrients: (nutrients: any[] | null) => void

    nutritionInfo: any | null
    setNutritionInfo: (nutritionInfo: any | null) => void

    showHistoryDetails: boolean
    setShowHistoryDetails: (showHistoryDetails: boolean) => void

    rCaloricIntake: number
    setRCaloricIntake: (caloricIntake: number) => void
}

const useStore = create<Store>((set) => ({
    session: null,
    setSession: (session) => set((state) => ({ ...state, session })),

    nutrients: null,
    setNutrients: (nutrients) => set((state) => ({ ...state, nutrients })),

    nutritionInfo: null,
    setNutritionInfo: (nutritionInfo) =>
        set((state) => ({ ...state, nutritionInfo })),

    showHistoryDetails: false,
    setShowHistoryDetails: (showHistoryDetails) =>
        set((state) => ({ ...state, showHistoryDetails })),

    rCaloricIntake: 1850,
    setRCaloricIntake: (caloricIntake) =>
        set((state) => ({ ...state, caloricIntake })),
}))

export default useStore
