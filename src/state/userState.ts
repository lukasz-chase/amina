import create from "zustand";
//api
import * as api from "../api";
//interfaces
import { User, PostProperties, Subamin } from "../interfaces";

type Store = {
  loggedUser: User;
  user: User;
  isLoading: boolean;
  isLogged: boolean;
  userPosts: PostProperties[];
  userSavedPosts: PostProperties[];
  limit: number;
  userCreatedSubamins: Subamin[];
  fetchLoggedUser: () => void;
  fetchUserPosts: (limit: number, order: string, id?: String) => void;
  fetchUserSavedPosts: (id: String, limit: number) => void;
  savePost: (userId: String, postId: String) => void;
  logOut: () => void;
  changeLimit: (by: number) => void;
  fetchUserCreatedSubamins: (id: String) => void;
  changeDarkMode: (id: String) => void;
  updateInfo: (
    id: String,
    data: any,
    snackbarHandler: (text: any, snackVariant: any) => void
  ) => void;
  updateEmail: (
    id: String,
    email: string,
    password: string,
    snackbarHandler: (text: any, snackVariant: any) => void
  ) => void;
  updatePassword: (
    id: String,
    password: string,
    newPassword: string,
    snackbarHandler: (text: any, snackVariant: any) => void
  ) => void;
};

const userState = create<Store>((set, get) => ({
  loggedUser: {
    _id: "0",
    username: "loading",
    email: "loading",
    password: "loading",
    followedSubaminas: [],
    savedPosts: [],
    darkMode: false,
  },
  user: {
    _id: "0",
    username: "loading",
    email: "loading",
    password: "loading",
    followedSubaminas: [],
    savedPosts: [],
    darkMode: false,
  },
  userCreatedSubamins: [],
  limit: 20,
  isLoading: true,
  isLogged: false,
  userPosts: [],
  userSavedPosts: [],
  changeLimit: (by: number) => set((state) => ({ limit: state.limit + by })),
  changeDarkMode: async (userId) => {
    const { data } = await api.changeDarkMode(userId);
    set({ loggedUser: data });
  },
  savePost: async (userId, postId) => {
    try {
      const { data } = await api.savePost(userId, postId);
      set({ loggedUser: data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchLoggedUser: async () => {
    try {
      set({ isLoading: true });
      const user = JSON.parse(localStorage.getItem("profile") || "{}");
      if (user) {
        const { data } = await api.getUserById(user.result._id);
        set({ loggedUser: data });
        set({ isLogged: true });
        set({ isLoading: false });
      }
    } catch (error) {
      console.log(error);
    }
  },
  fetchUserCreatedSubamins: async (id) => {
    try {
      const { data } = await api.getUserCreatedSubamins(id);
      set({ userCreatedSubamins: data });
    } catch (error) {
      console.log(error);
    }
  },
  logOut: () => {
    set({ isLogged: false });
    localStorage.removeItem("profile");
    set({
      loggedUser: {
        _id: "0",
        username: "loading",
        email: "loading",
        password: "loading",
        followedSubaminas: [],
        savedPosts: [],
        darkMode: false,
      },
    });
  },
  fetchUserPosts: async (limit, order, id) => {
    try {
      const { data } = await api.getUserPosts(id!, limit, order);
      set({ userPosts: data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchUserSavedPosts: async (id, limit) => {
    try {
      const { data } = await api.getUserSavedPosts(id, limit);
      set({ userSavedPosts: data });
    } catch (error) {
      console.log(error);
    }
  },
  updateInfo: async (id, info, snackbarHandler) => {
    try {
      const { data } = await api.updateInfo(id, info);
      set({ loggedUser: data });
      snackbarHandler("Info updated successfully", "success");
    } catch (error: any) {
      snackbarHandler(error.response.data, "error");
      console.log(error);
    }
  },
  updateEmail: async (id, email, password, snackbarHandler) => {
    try {
      const { data } = await api.updateEmail(id, email, password);
      set({ loggedUser: data });
      snackbarHandler("Email changed successfully", "success");
    } catch (error: any) {
      snackbarHandler(error.response.data, "error");
      console.log(error);
    }
  },
  updatePassword: async (id, password, newPassword, snackbarHandler) => {
    try {
      const { data } = await api.updatePassword(id, password, newPassword);
      set({ loggedUser: data });
      snackbarHandler("Password changed successfully", "success");
      get().logOut();
    } catch (error: any) {
      snackbarHandler(error.response.data, "error");
      console.log(error);
    }
  },
}));

export default userState;
