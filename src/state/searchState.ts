import create from "zustand";
//api
import { postSearch, subaminsSearch } from "../api";
//interfaces
import { PostProperties } from "../interfaces";
import { Subamin } from "../interfaces";

type Props = {
  subaminasSearch: Subamin[];
  postSearch: PostProperties[];
  fetchTopSubaminasSearch: (question?: string) => void;
  fetchNewSubaminasSearch: (question?: string) => void;
  fetchTopPostsSearch: (question?: string) => void;
  fetchNewPostsSearch: (question?: string) => void;
};

const searchState = create<Props>((set) => ({
  subaminasSearch: [],
  postSearch: [],
  fetchTopSubaminasSearch: async (q) => {
    const response = await fetch(subaminsSearch(q!, "upvotes", "desc"));
    set({ subaminasSearch: await response.json() });
  },
  fetchNewSubaminasSearch: async (q) => {
    const response = await fetch(subaminsSearch(q!, "id", "asc"));
    set({ subaminasSearch: await response.json() });
  },
  fetchTopPostsSearch: async (q) => {
    const response = await fetch(postSearch(q!, "upvotes", "desc"));
    set({ postSearch: await response.json() });
  },
  fetchNewPostsSearch: async (q) => {
    const response = await fetch(postSearch(q!, "id", "asc"));
    set({ postSearch: await response.json() });
  },
}));

export default searchState;
