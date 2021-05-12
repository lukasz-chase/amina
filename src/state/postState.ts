import create from "zustand";
//api
import { postsUrl, postDetails, allPostsUrl } from "../api";
//interfaces
import { PostProperties } from "../interfaces";

type Store = {
  posts: PostProperties[];
  fetchTopPosts: (limit: number) => void;
  fetchNewPosts: (limit: number) => void;
  postDetails: PostProperties;
  fetchPostDetails: (id: number) => Promise<void>;
  limit: number;
  changeLimit: (by: number) => void;
  fetchAllPosts: () => void;
  allPosts: PostProperties[];
};

export const postState = create<Store>((set) => ({
  posts: [],
  allPosts: [],
  limit: 20,
  changeLimit: (by: number) => set((state) => ({ limit: state.limit + by })),
  fetchTopPosts: async (limit: number) => {
    const response = await fetch(postsUrl("upvotes", "desc", limit));
    set({ posts: await response.json() });
  },
  fetchNewPosts: async (limit: number) => {
    const response = await fetch(postsUrl("id", "desc", limit));
    set({ posts: await response.json() });
  },
  fetchAllPosts: async () => {
    const response = await fetch(allPostsUrl("id", "desc"));
    set({ allPosts: await response.json() });
  },
  postDetails: {
    id: 1,
    subaminId: 1,
    subaminName: "loading...",
    subaminLogo: "loading...",
    title: "loading...",
    description: "loading...",
    author: "loading...",
    authorId: 0,
    upvotes: 1,
    upvotedBy: [],
    downvotedBy: [],
    date: "loading...",
  },
  fetchPostDetails: async (id) => {
    const response = await fetch(postDetails(id));
    set({ postDetails: await response.json() });
  },
}));

export default postState;
