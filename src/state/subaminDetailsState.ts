import create from "zustand";
//api
import * as api from "../api";
//interfaces
import { Subamin, PostProperties } from "../interfaces";

type Store = {
  subamin: Subamin;
  fetchSubamin: (id: String) => void;
  subaminPosts: PostProperties[];
  fetchSubaminPosts: (limit: number, order: string, id?: String) => void;
  limit: number;
  changeLimit: (by: number) => void;
};

const subaminState = create<Store>((set) => ({
  subamin: {
    _id: "0",
    name: "loading",
    members: 1,
    logo: "loading",
    desc: "loading",
    createdAt: "loading",
    authorId: "1",
  },
  limit: 20,
  changeLimit: (by: number) => set((state) => ({ limit: state.limit + by })),
  fetchSubamin: async (id) => {
    try {
      const { data } = await api.getSubaminDetails(id);
      set({ subamin: data });
    } catch (error) {
      console.log(error);
    }
  },
  subaminPosts: [],
  fetchSubaminPosts: async (limit, order, id) => {
    try {
      const { data } = await api.getSubaminPosts(limit, order, id);
      set({ subaminPosts: data });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default subaminState;
