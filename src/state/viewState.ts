import create from "zustand";

type Store = {
  darkMode: boolean;
  changeDarkMode: () => void;
  classicView: boolean;
  setClassicView: (a: boolean) => void;
  compactView: boolean;
  setCompactView: (a: boolean) => void;
};

export const viewState = create<Store>((set) => ({
  darkMode: false,
  changeDarkMode() {
    set((state) => ({ ...state, darkMode: !state.darkMode }));
  },
  classicView: false,
  setClassicView(a) {
    set((state) => ({ ...state, classicView: a, compactView: false }));
  },
  compactView: false,
  setCompactView(a) {
    set((state) => ({ ...state, compactView: a, classicView: true }));
  },
}));

export default viewState;
