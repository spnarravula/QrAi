import { create } from "zustand";

const useTokens = create((set) => ({
 initialData: 0,
 setInitialData: (data) => set({ initialData: data }),
 decreaseTokens: () => set((state) => ({ initialData: state.initialData - 1 })),
 removeTokens: () => set({ initialData: 0 }),
}));

export default useTokens;