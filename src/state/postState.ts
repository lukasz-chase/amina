import create from "zustand";
//api
import * as api from "../api";
//interfaces
import { PostProperties } from "../interfaces";

type Store = {
  posts: PostProperties[];
  postDetails: PostProperties;
  allPosts: PostProperties[];
  limit: number;
  usersFeed: PostProperties[];
  topPosts: PostProperties[];
  likePost: (id: String, userId: String, method: string) => void;
  fetchPosts: (limit: number, order: string) => void;
  getUserFeed: (id: String, limit: number, order: string) => void;
  fetchPostDetails: (id: String) => Promise<void>;
  changeLimit: (by: number) => void;
  createPost: (post: any, history: any) => void;
  fetchTopPosts: (limit: number) => void;
};

export const postState = create<Store>((set) => ({
  posts: [],
  allPosts: [],
  usersFeed: [],
  topPosts: [],
  limit: 20,
  postDetails: {
    _id: "1",
    subaminId: "1",
    subaminName: "loading...",
    subaminLogo: "loading...",
    title: "loading...",
    description: "loading...",
    author: "loading...",
    authorId: "0",
    upvotes: 1,
    upvotedBy: [],
    downvotedBy: [],
    createdAt: "loading..",
  },
  createPost: async (post, history) => {
    try {
      const { data } = await api.createPost(post);
      set((state) => ({ posts: [...state.posts, data] }));
      history.push(`/post/${data._id}`);
    } catch (error) {
      console.log(error);
    }
  },
  likePost: async (postId, userId, method) => {
    try {
      const { data } = await api.likePost(postId, userId, method);
      set((state) => ({
        posts: state.posts.map((post) => (post._id === postId ? data : post)),
        topPosts: state.topPosts.map((post) =>
          post._id === postId ? data : post
        ),
        allPosts: state.allPosts.map((post) =>
          post._id === postId ? data : post
        ),
        usersFeed: state.usersFeed.map((post) =>
          post._id === postId ? data : post
        ),
        postDetails: data,
      }));
    } catch (error) {
      console.log(error);
    }
  },
  changeLimit: (by: number) => set((state) => ({ limit: state.limit + by })),
  getUserFeed: async (id, limit, order) => {
    try {
      const { data } = await api.getFeedPosts(id, limit, order);
      set(() => ({ usersFeed: data }));
    } catch (error) {
      console.log(error);
    }
  },
  fetchPosts: async (limit, order) => {
    try {
      const { data } = await api.getPosts(limit, order);
      set(() => ({ posts: data }));
    } catch (error) {
      console.log(error);
    }
  },
  fetchTopPosts: async (limit) => {
    try {
      const { data } = await api.getPosts(limit, "upvotes");
      set(() => ({ topPosts: data }));
    } catch (error) {
      console.log(error);
    }
  },
  fetchPostDetails: async (id) => {
    try {
      const { data } = await api.getPostDetails(id);
      set({ postDetails: data });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default postState;
