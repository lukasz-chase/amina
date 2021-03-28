import create from "zustand";
// import axios from "axios";
import { subaminsUrl, postsUrl, postDetails } from "./api";

interface CommentProperties {
  id: number;
  author: string;
  upvotes: number;
  date: string;
  text: string;
}
interface PostProperties {
  id: number;
  subamindId: number;
  subaminName: string;
  subaminLogo: string;
  title: string;
  description: string;
  author: string;
  upvotes: number;
  date: string;
  comments?: CommentProperties[];
  image?: string;
}

interface Subamin {
  id: number;
  name: string;
  members: number;
  logo: string;
}

type Store = {
  darkMode: boolean;
  changeDarkMode: () => void;
  classicView: boolean;
  setClassicView: (a: boolean) => void;
  compactView: boolean;
  setCompactView: (a: boolean) => void;
  subamins: Subamin[];
  fetchSubamins: () => void;
  posts: PostProperties[];
  fetchTopPosts: () => void;
  fetchNewPosts: () => void;
  postDetails: PostProperties;
  fetchPostDetails: (id: number) => Promise<void>;
  // fetchSubaminByIds: ([]) => void;
  // users: [];
};

export const useStore = create<Store>((set) => ({
  darkMode: false,
  changeDarkMode() {
    set((state) => ({ ...state, darkMode: !state.darkMode }));
  },
  classicView: false,
  setClassicView(a) {
    set((state) => ({ ...state, classicView: a, compactView: false }));
  },
  compactView: false,
  setCompactView(a) {
    set((state) => ({ ...state, compactView: a, classicView: true }));
  },
  subamins: [],
  fetchSubamins: async () => {
    const response = await fetch(subaminsUrl);
    set({ subamins: await response.json() });
  },
  posts: [],
  fetchTopPosts: async () => {
    const response = await fetch(postsUrl("upvotes", "desc"));
    set({ posts: await response.json() });
  },
  fetchNewPosts: async () => {
    const response = await fetch(postsUrl("date", "desc"));
    set({ posts: await response.json() });
  },
  postDetails: {
    id: 1,
    subamindId: 1,
    subaminName: "loading...",
    subaminLogo: "loading...",
    title: "loading...",
    description: "loading...",
    author: "loading...",
    upvotes: 1,
    date: "loading...",
  },
  fetchPostDetails: async (id) => {
    const response = await fetch(postDetails(id));

    set({ postDetails: await response.json() });
  },
  // users: [],
  // fetchSubaminByIds: async (ids: number[]) => {
  //   const url = `${subaminsUrl}${ids.map((id) => `&id=${id}`).join("")}`;
  //   console.log(url);
  //   const response = await fetch(url);
  //   set({ users: await response.json() });
  // },
}));

export default useStore;
