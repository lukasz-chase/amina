import create from "zustand";
//api
import { userDetails } from "../api";
//interfaces
import { User } from "../interfaces";

type Store = {
  loggedUser: User;
  fetchUser: (id: number) => void;
  isLogged: boolean;
  logOut: () => void;
  logIn: () => void;
};

const userState = create<Store>((set) => ({
  loggedUser: {
    id: 1,
    username: "loading",
    email: "loading",
    password: "loading",
    followedSubaminas: [],
    darkMode: false,
  },
  isLogged: false,
  fetchUser: async (id) => {
    const response = await fetch(userDetails(id));
    set({ loggedUser: await response.json(), isLogged: response.ok });
  },
  logIn: () => set({ isLogged: true }),
  logOut: () => set({ isLogged: false }),
}));

export default userState;
