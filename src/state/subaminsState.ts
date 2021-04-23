import create from "zustand";
import { subaminsUrl, feed } from "../api";
import { PostProperties, Subamin } from "../interfaces";

type Store = {
  subamins: Subamin[];
  fetchSubamins: () => void;
  fetchSubaminByIds: ([]) => void;
  usersFeed: PostProperties[];
};

export const subaminsState = create<Store>((set) => ({
  subamins: [],
  fetchSubamins: async () => {
    const response = await fetch(subaminsUrl);
    set({ subamins: await response.json() });
  },
  usersFeed: [],
  fetchSubaminByIds: async (ids: number[]) => {
    const url = `${feed}${ids.map((id) => `&id=${id}`).join("")}`;
    const response = await fetch(url);
    set({ usersFeed: await response.json() });
  },
}));

export default subaminsState;
