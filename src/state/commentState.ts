import create from "zustand";
//api
import * as api from "../api";
//interfaces
import { CommentProperties } from "../interfaces";

type Store = {
  comments: CommentProperties[];
  fetchComments: (id: String, order: string) => void;
  createComment: (comment: any) => void;
  editComment: (id: String, text: any) => void;
  deleteComment: (id: String) => void;
  likeComment: (id: String, userId: String, method: string) => void;
};

const commentsState = create<Store>((set) => ({
  comments: [],
  fetchComments: async (id, order) => {
    try {
      const { data } = await api.getComments(id, order);
      set({ comments: data });
    } catch (error) {
      console.log(error);
    }
  },
  likeComment: async (commentId, userId, method) => {
    try {
      const { data } = await api.likeComment(commentId, userId, method);
      set((state) => ({
        comments: state.comments.map((comment) =>
          comment._id === commentId ? data : comment
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  },
  createComment: async (comment) => {
    try {
      const { data } = await api.createComment(comment);
      set((state) => ({ comments: [...state.comments, data] }));
    } catch (error) {
      console.log(error);
    }
  },
  editComment: async (id, comment) => {
    try {
      const { data } = await api.editComment(id, comment);
      set((state) => ({
        comments: state.comments.map((comment) =>
          comment._id === id ? data : comment
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  },
  deleteComment: async (id) => {
    try {
      await api.deleteComment(id);
      set((state) => ({
        comments: state.comments.filter((comment) => comment._id !== id),
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));

export default commentsState;
