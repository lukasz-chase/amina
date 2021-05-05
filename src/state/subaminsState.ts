import create from "zustand";
//url
import { subaminsUrl, feed, usersSubamins } from "../api";
//interfaces
import { PostProperties, Subamin } from "../interfaces";

type Store = {
  subamins: Subamin[];
  fetchSubamins: () => void;
  fetchNewSubaminByIds: (ids: number[]) => void;
  fetchTopSubaminByIds: (ids: number[]) => void;
  usersFeed: PostProperties[];
  usersSubaminas: Subamin[];
  fetchUsersSubamins: (ids: number[], name: string) => void;
};

export const subaminsState = create<Store>((set) => ({
  subamins: [],
  usersFeed: [],
  fetchSubamins: async () => {
    const response = await fetch(subaminsUrl);
    set({ subamins: await response.json() });
  },
  fetchNewSubaminByIds: async (ids: number[]) => {
    const url = `${feed("id", "desc")}${ids
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
  fetchUsersSubamins: async (ids: number[], name: string) => {
    const url = `${usersSubamins(name)}${ids
      .map((id) => `&id=${id}`)
      .join("")}`;
    const response = await fetch(url);
    set({ usersSubaminas: await response.json() });
  },
  usersSubaminas: [],
}));

export default subaminsState;
