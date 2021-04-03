import create from "zustand";
//api
import { postSearch, subaminsSearch } from "../api";

type Props = {
  subaminasSearch: Object;
  postSearch: Object;
  fetchSubaminasSearch: (question: string) => void;
  fetchPostsSearch: (question: string) => void;
};

const searchState = create<Props>((set) => ({
  subaminasSearch: {},
  postSearch: {},
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
