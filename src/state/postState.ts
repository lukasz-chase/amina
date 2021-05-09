import create from "zustand";
//api
import { postsUrl, postDetails } from "../api";
//interfaces
import { PostProperties } from "../interfaces";

type Store = {
  posts: PostProperties[];
  fetchTopPosts: () => void;
  fetchNewPosts: () => void;
  postDetails: PostProperties;
  fetchPostDetails: (id: number) => Promise<void>;
};

export const postState = create<Store>((set) => ({
  posts: [],
  fetchTopPosts: async () => {
    const response = await fetch(postsUrl("upvotes", "desc"));
    set({ posts: await response.json() });
  },
  fetchNewPosts: async () => {
    const response = await fetch(postsUrl("id", "desc"));
    set({ posts: await response.json() });
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
