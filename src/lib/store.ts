import { create } from "zustand";

type Store = {
  nutrients: any[] | null;
  setNutrients: (nutrients: any[] | null) => void;
};

const useStore = create<Store>((set) => ({
  nutrients: null,
  setNutrients: (nutrients) => set((state) => ({ ...state, nutrients })),
}));

export default useStore;
