import create from "zustand";
//api
import { userDetails, userPosts, userSavedPosts } from "../api";
//interfaces
import { User, PostProperties } from "../interfaces";

type Store = {
  loggedUser: User;
  user: User;
  isLogged: boolean;
  fetchUser: (id: number) => void;
  fetchLoggedUser: (id: number) => void;
  fetchNewUserPosts: (id?: number) => void;
  fetchTopUserPosts: (id?: number) => void;
  fetchUserSavedPosts: (ids: number[]) => void;
  logOut: () => void;
  userPosts: PostProperties[];
  userSavedPosts: PostProperties[];
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
  isLogged: false,
  userPosts: [],
  userSavedPosts: [],
  fetchLoggedUser: async (id) => {
    const response = await fetch(userDetails(id));
    set({ loggedUser: await response.json(), isLogged: response.ok });
  },
  logOut: () => set({ isLogged: false }),
  fetchNewUserPosts: async (id) => {
    const response = await fetch(userPosts(id!, "id", "desc"));
    set({ userPosts: await response.json() });
  },
  fetchTopUserPosts: async (id) => {
    const response = await fetch(userPosts(id!, "upvotes", "desc"));
    set({ userPosts: await response.json() });
  },
  fetchUser: async (id) => {
    const response = await fetch(userDetails(id));
    set({ user: await response.json() });
  },
  fetchUserSavedPosts: async (ids: number[]) => {
    const url = `${userSavedPosts()}${ids.map((id) => `&id=${id}`).join("")}`;
    const response = await fetch(url);
    set({ userSavedPosts: await response.json() });
  },
}));

export default userState;
