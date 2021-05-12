import create from "zustand";
//api
import { subaminDetails, subaminsPosts } from "../api";
//interfaces
import { Subamin, PostProperties } from "../interfaces";

type Store = {
  subamin: Subamin;
  fetchSubamin: (id: number) => void;
  subaminPosts: PostProperties[];
  fetchSubaminTopPosts: (limit: number, id?: number) => void;
  fetchSubaminNewPosts: (limit: number, id?: number) => void;
  limit: number;
  changeLimit: (by: number) => void;
};

const subaminState = create<Store>((set) => ({
  subamin: {
    id: 0,
    name: "loading",
    members: 1,
    logo: "loading",
    desc: "loading",
    birthday: "loading",
    authorId: 1,
  },
  limit: 20,
  changeLimit: (by: number) => set((state) => ({ limit: state.limit + by })),
  fetchSubamin: async (id) => {
    const response = await fetch(subaminDetails(id));
    set({ subamin: await response.json() });
  },
  subaminPosts: [],
  fetchSubaminTopPosts: async (limit, id) => {
    const response = await fetch(subaminsPosts(id!, "upvotes", "desc", limit));
    set({ subaminPosts: await response.json() });
  },
  fetchSubaminNewPosts: async (limit, id) => {
    const response = await fetch(subaminsPosts(id!, "id", "desc", limit));
    set({ subaminPosts: await response.json() });
  },
}));

export default subaminState;
