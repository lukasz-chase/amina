import create from "zustand";
//api
import { postSearch, subaminsSearch } from "../api";
//interfaces
import { PostProperties } from "../interfaces";
import { Subamin } from "../interfaces";

type Props = {
  subaminasSearch: Subamin[];
  postSearch: PostProperties[];
  fetchTopSubaminasSearch: (limit: number, question?: string) => void;
  fetchNewSubaminasSearch: (limit: number, question?: string) => void;
  fetchTopPostsSearch: (limit: number, question?: string) => void;
  fetchNewPostsSearch: (limit: number, question?: string) => void;
  limit: number;
  changeLimit: (by: number) => void;
};

const searchState = create<Props>((set) => ({
  subaminasSearch: [],
  postSearch: [],
  limit: 20,
  changeLimit: (by: number) => set((state) => ({ limit: state.limit + by })),
  fetchTopSubaminasSearch: async (limit, q) => {
    const response = await fetch(subaminsSearch(q!, "members", "desc", limit));
    set({ subaminasSearch: await response.json() });
  },
  fetchNewSubaminasSearch: async (limit, q) => {
    const response = await fetch(subaminsSearch(q!, "id", "desc", limit));
    set({ subaminasSearch: await response.json() });
  },
  fetchTopPostsSearch: async (limit, q) => {
    const response = await fetch(postSearch(q!, "upvotes", "desc", limit));
    set({ postSearch: await response.json() });
  },
  fetchNewPostsSearch: async (limit, q) => {
    const response = await fetch(postSearch(q!, "id", "desc", limit));
    set({ postSearch: await response.json() });
  },
}));

export default searchState;
