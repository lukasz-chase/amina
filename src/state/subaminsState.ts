import create from "zustand";
//url
import { subaminsUrl, feed, usersSubamins, allSubaminsUrl } from "../api";
//interfaces
import { PostProperties, Subamin } from "../interfaces";

type Store = {
  subamins: Subamin[];
  allSubamins: Subamin[];
  fetchAllSubamins: () => void;
  fetchSubamins: () => void;
  fetchNewSubaminByIds: (ids: number[], limit: number) => void;
  fetchTopSubaminByIds: (ids: number[], limit: number) => void;
  usersFeed: PostProperties[];
  usersSubaminas: Subamin[];
  fetchUsersSubamins: (ids: number[], name: string, limit: number) => void;
  limit: number;
  changeLimit: (by: number) => void;
  createCommunity: Subamin;
  setCommunity: (subamin?: Subamin) => void;
};

export const subaminsState = create<Store>((set) => ({
  subamins: [],
  allSubamins: [],
  usersFeed: [],
  createCommunity: {
    id: 0,
    name: "loading",
    members: 1,
    logo: "loading",
    desc: "loading",
    birthday: "loading",
    authorId: 1,
  },
  setCommunity: (subamin) => set(() => ({ createCommunity: subamin! })),
  limit: 20,
  changeLimit: (by: number) => set((state) => ({ limit: state.limit + by })),
  fetchSubamins: async () => {
    const response = await fetch(subaminsUrl);
    set({ subamins: await response.json() });
  },
  fetchAllSubamins: async () => {
    const response = await fetch(allSubaminsUrl("id", "desc"));
    set({ allSubamins: await response.json() });
  },
  fetchNewSubaminByIds: async (ids: number[], limit) => {
    const url = `${feed("id", "desc", limit)}${ids
      .map((id) => `&subaminId=${id}`)
      .join("")}`;
    const response = await fetch(url);
    set({ usersFeed: await response.json() });
  },
  fetchTopSubaminByIds: async (ids: number[], limit) => {
    const url = `${feed("upvotes", "desc", limit)}${ids
      .map((id) => `&subaminId=${id}`)
      .join("")}`;
    const response = await fetch(url);
    set({ usersFeed: await response.json() });
  },
  fetchUsersSubamins: async (ids: number[], name: string, limit) => {
    const url = `${usersSubamins(name, limit)}${ids
      .map((id) => `&id=${id}`)
      .join("")}`;
    const response = await fetch(url);
    set({ usersSubaminas: await response.json() });
  },
  usersSubaminas: [],
}));

export default subaminsState;
