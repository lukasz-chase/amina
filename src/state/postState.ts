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
  collapseThread: (id: number) => void;
};

export const postState = create<Store>((set) => ({
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
    subaminId: 1,
    subaminName: "loading...",
    subaminLogo: "loading...",
    title: "loading...",
    description: "loading...",
    author: "loading...",
    upvotes: 1,
    upvotedBy: [],
    downvotedBy: [],
    date: "loading...",
  },
  fetchPostDetails: async (id) => {
    const response = await fetch(postDetails(id));

    set({ postDetails: await response.json() });
  },
  collapseThread(id) {
    set((state) => ({
      postDetails: {
        id: state.postDetails.id,
        subaminId: state.postDetails.subaminId,
        subaminLogo: state.postDetails.subaminLogo,
        subaminName: state.postDetails.subaminName,
        title: state.postDetails.title,
        description: state.postDetails.description,
        author: state.postDetails.author,
        upvotes: state.postDetails.upvotes,
        upvotedBy: state.postDetails.upvotedBy,
        downvotedBy: state.postDetails.downvotedBy,
        date: state.postDetails.date,
        image: state.postDetails.image,
        comments: state.postDetails.comments?.filter(
          (comment) => comment.id !== id
        ),
      },
    }));
  },
}));

export default postState;
