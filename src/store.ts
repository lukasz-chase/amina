import create from "zustand";
// import axios from "axios";
import { subaminsUrl, postsUrl } from "./api";


interface CommentProperties {
  id: number;
  author: string;
  upvotes: number;
  date: string;
}
interface PostProperties {
  id: number;
  subamindId: number,
  subaminName: string,
  title: string;
  description: string;
  author: string;
  upvotes: number;
  date: string,
  comments: CommentProperties[];
  image: string;
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
    const response = await fetch(postsUrl('upvotes','desc'));
    set({ posts: await response.json() }); 
  },
  fetchNewPosts: async () => {
    const response = await fetch(postsUrl('id','desc'));
    set({ posts: await response.json() }); 
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
