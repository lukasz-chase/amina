import create from "zustand";
//api
import { subaminDetails, subaminsPosts } from "../api";
//interfaces
import { Subamin, PostProperties } from "../interfaces";

type Store = {
  subamin: Subamin;
  fetchSubamin: (id: number) => void;
  subaminPosts: PostProperties[];
  fetchSubaminTopPosts: (id?: number) => void;
  fetchSubaminNewPosts: (id?: number) => void;
};

const subaminState = create<Store>((set) => ({
  subamin: {
    id: 1,
    name: "loading",
    members: 1,
    logo: "loading",
    desc: "loading",
  },
  fetchSubamin: async (id) => {
    const response = await fetch(subaminDetails(id));
    set({ subamin: await response.json() });
  },
  subaminPosts: [],
  fetchSubaminTopPosts: async (id) => {
    const response = await fetch(subaminsPosts(id!, "upvotes", "desc"));
    set({ subaminPosts: await response.json() });
  },
  fetchSubaminNewPosts: async (id) => {
    const response = await fetch(subaminsPosts(id!, "date", "desc"));
    set({ subaminPosts: await response.json() });
  },
}));

export default subaminState;
