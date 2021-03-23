import create from "zustand";
// import axios from "axios";
import { subaminsUrl } from "./api";

interface Subamin {
  id: number;
  name: string;
  members: number;
  logo: string;
  posts: [];
}

type Store = {
  darkMode: boolean;
  changeDarkMode: () => void;
  subaminsDesc: Subamin[];
  fetchSubaminsDesc: () => void;
  // fetchSubaminByIds: ([]) => void;
  // users: [];
};

const useStore = create<Store>((set) => ({
  darkMode: false,
  changeDarkMode() {
    set((state) => ({ ...state, darkMode: !state.darkMode }));
  },
  subaminsDesc: [],
  fetchSubaminsDesc: async () => {
    const response = await fetch(subaminsUrl);
    set({ subaminsDesc: await response.json() });
  },
  // users: [],
  // fetchSubaminByIds: async (ids: number[]) => {
  //   const url = `${subaminsUrl}${ids.map((id) => `&id=${id}`).join("")}`;
  //   console.log(url);
  //   const response = await fetch(url);
  //   set({ users: await response.json() });
  // },
}));

export default useStore;
