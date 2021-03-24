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
  setClassicView: () => void;
  subamins: Subamin[];
  fetchSubamins: () => void;
  posts: PostProperties[];
  fetchPosts: () => void;
  // fetchSubaminByIds: ([]) => void;
  // users: [];
};

export const useStore = create<Store>((set) => ({
  darkMode: false,
  changeDarkMode() {
    set((state) => ({ ...state, darkMode: !state.darkMode }));
  },
  classicView: false,
  setClassicView(){
    set((state)=> ({...state, classicView: !state.classicView}))
  },
  subamins: [],
  fetchSubamins: async () => {
    const response = await fetch(subaminsUrl);
    set({ subamins: await response.json() });
  },
  posts:   [],
  fetchPosts: async () => {
    const response = await fetch(postsUrl);
    set({   posts: await response.json()   })
  }
  // users: [],
  // fetchSubaminByIds: async (ids: number[]) => {
  //   const url = `${subaminsUrl}${ids.map((id) => `&id=${id}`).join("")}`;
  //   console.log(url);
  //   const response = await fetch(url);
  //   set({ users: await response.json() });
  // },
}));

export default useStore;
