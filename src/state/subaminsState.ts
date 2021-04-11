import create from "zustand";
import { subaminsUrl } from "../api";
import { Subamin } from "../interfaces";

type Store = {
  subamins: Subamin[];
  fetchSubamins: () => void;
  // fetchSubaminByIds: ([]) => void;
  // users: [];
};

export const subaminsState = create<Store>((set) => ({
  subamins: [],
  fetchSubamins: async () => {
    const response = await fetch(subaminsUrl);
    set({ subamins: await response.json() });
  },
  // users: [],
  // fetchSubaminByIds: async (ids: number[]) => {
  //   const url = `${subaminsUrl}${ids.map((id) => `&id=${id}`).join("")}`;
  //   console.log(url);
  //   const response = await fetch(url);
  //   set({ users: await response.json() });
  // },
}));

export default subaminsState;
