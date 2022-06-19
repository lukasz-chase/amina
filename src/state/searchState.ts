import create from "zustand";
//api
import * as api from "../api";
//interfaces
import { PostProperties } from "../interfaces";
import { Subamin } from "../interfaces";

type Props = {
  subaminasSearch: Subamin[];
  postSearch: PostProperties[];
  limit: number;
  fetchSubaminasSearch: (
    limit: number,
    order: string,
    question?: string
  ) => void;
  fetchPostsSearch: (limit: number, order: string, question?: string) => void;
  changeLimit: (by: number) => void;
};

const searchState = create<Props>((set) => ({
  subaminasSearch: [],
  postSearch: [],
  limit: 20,
  changeLimit: (by: number) => set((state) => ({ limit: state.limit + by })),
  fetchSubaminasSearch: async (limit, order, q) => {
    try {
      const { data } = await api.getSubaminsBySearch(limit, order, q!);
      set({ subaminasSearch: data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchPostsSearch: async (limit, order, q) => {
    try {
      const { data } = await api.getSearchPost(limit, order, q!);
      set({ postSearch: data });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default searchState;
