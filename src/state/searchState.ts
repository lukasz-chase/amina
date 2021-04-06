import create from "zustand";
//api
import { postSearch, subaminsSearch } from "../api";
//interfaces
import { PostProperties } from "../interfaces";
import { Subamin } from "../interfaces";

type Props = {
  subaminasSearch: Subamin[];
  postSearch: PostProperties[];
  fetchSubaminasSearch: (question: string) => void;
  fetchPostsSearch: (question: string) => void;
};

const searchState = create<Props>((set) => ({
  subaminasSearch: [],
  postSearch: [],
  fetchSubaminasSearch: async (q) => {
    const response = await fetch(subaminsSearch(q));
    set({ subaminasSearch: await response.json() });
  },
  fetchPostsSearch: async (q) => {
    const response = await fetch(postSearch(q));
    set({ postSearch: await response.json() });
  },
}));

export default searchState;
