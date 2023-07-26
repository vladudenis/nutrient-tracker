import { create } from "zustand";

type Store = {
  nutrients: any[] | null;
  setNutrients: (nutrients: any[] | null) => void;

  nutritionInfo: any | null;
  setNutritionInfo: (nutritionInfo: any | null) => void;

  showHistoryDetails: boolean;
  setShowHistoryDetails: (showHistoryDetails: boolean) => void;
};

const useStore = create<Store>((set) => ({
  nutrients: null,
  setNutrients: (nutrients) => set((state) => ({ ...state, nutrients })),

  nutritionInfo: null,
  setNutritionInfo: (nutritionInfo) =>
    set((state) => ({ ...state, nutritionInfo })),

  showHistoryDetails: false,
  setShowHistoryDetails: (showHistoryDetails) =>
    set((state) => ({ ...state, showHistoryDetails })),
}));

export default useStore;
