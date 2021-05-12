import create from "zustand";
//api
import {
  userDetails,
  userPosts,
  userSavedPosts,
  userCreatedSubamins,
} from "../api";
//interfaces
import { User, PostProperties, Subamin } from "../interfaces";

type Store = {
  loggedUser: User;
  user: User;
  isLogged: boolean;
  fetchUser: (id: number) => void;
  fetchLoggedUser: (id: number) => void;
  fetchNewUserPosts: (limit: number, id?: number) => void;
  fetchTopUserPosts: (limit: number, id?: number) => void;
  fetchUserSavedPosts: (ids: number[], limit: number) => void;
  logOut: () => void;
  userPosts: PostProperties[];
  userSavedPosts: PostProperties[];
  limit: number;
  changeLimit: (by: number) => void;
  userCreatedSubamins: Subamin[];
  fetchUserCreatedSubamins: (id: number) => void;
};

const userState = create<Store>((set) => ({
  loggedUser: {
    id: 0,
    username: "loading",
    email: "loading",
    password: "loading",
    followedSubaminas: [],
    savedPosts: [],
    darkMode: false,
  },
  user: {
    id: 0,
    username: "loading",
    email: "loading",
    password: "loading",
    followedSubaminas: [],
    savedPosts: [],
    darkMode: false,
  },
  userCreatedSubamins: [],
  limit: 20,
  changeLimit: (by: number) => set((state) => ({ limit: state.limit + by })),
  isLogged: false,
  userPosts: [],
  userSavedPosts: [],
  fetchLoggedUser: async (id) => {
    const response = await fetch(userDetails(id));
    set({ loggedUser: await response.json(), isLogged: response.ok });
  },
  fetchUserCreatedSubamins: async (id) => {
    const response = await fetch(userCreatedSubamins(id));
    set({ userCreatedSubamins: await response.json() });
  },
  logOut: () => set({ isLogged: false }),
  fetchNewUserPosts: async (limit, id) => {
    const response = await fetch(userPosts(id!, "id", "desc", limit));
    set({ userPosts: await response.json() });
  },
  fetchTopUserPosts: async (limit, id) => {
    const response = await fetch(userPosts(id!, "upvotes", "desc", limit));
    set({ userPosts: await response.json() });
  },
  fetchUser: async (id) => {
    const response = await fetch(userDetails(id));
    set({ user: await response.json() });
  },
  fetchUserSavedPosts: async (ids: number[], limit) => {
    const url = `${userSavedPosts(limit)}${ids
      .map((id) => `&id=${id}`)
      .join("")}`;
    const response = await fetch(url);
    set({ userSavedPosts: await response.json() });
  },
}));

export default userState;
