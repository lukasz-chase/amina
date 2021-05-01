import create from "zustand";
//url
import { subaminsUrl, feed } from "../api";
//interfaces
import { PostProperties, Subamin } from "../interfaces";

type Store = {
  subamins: Subamin[];
  fetchSubamins: () => void;
  fetchNewSubaminByIds: (ids: number[]) => void;
  fetchTopSubaminByIds: (ids: number[]) => void;
  usersFeed: PostProperties[];
};

export const subaminsState = create<Store>((set) => ({
  subamins: [],
  usersFeed: [],
  fetchSubamins: async () => {
    const response = await fetch(subaminsUrl);
    set({ subamins: await response.json() });
  },
  fetchNewSubaminByIds: async (ids: number[]) => {
    const url = `${feed("date", "desc")}${ids
      .map((id) => `&subaminId=${id}`)
      .join("")}`;
    const response = await fetch(url);
    set({ usersFeed: await response.json() });
  },
  fetchTopSubaminByIds: async (ids: number[]) => {
    const url = `${feed("upvotes", "desc")}${ids
      .map((id) => `&subaminId=${id}`)
      .join("")}`;
    const response = await fetch(url);
    set({ usersFeed: await response.json() });
  },
}));

export default subaminsState;
