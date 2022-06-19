import create from "zustand";
//api
import * as api from "../api";
//interfaces
import { formData } from "../pages/LoginPage";

type Store = {
  signInError: string | boolean;
  signUpError: string | boolean;
  isLogged: boolean;
  setSignUpError: (msg: string) => void;
  setSignInError: (msg: string) => void;
  authData: string;
  signIn: (formData: formData, history: any, fromUpvote: string) => void;
  signUp: (formData: formData, history: any) => void;
  logOut: () => void;
};

const authState = create<Store>((set) => ({
  setSignUpError: (msg) => set({ signUpError: msg }),
  signInError: false,
  setSignInError: (msg) => set({ signInError: msg }),
  signUpError: false,
  isLogged: false,
  authData: "",
  signIn: async (formData, history, fromUpvote) => {
    try {
      const { data } = await api.signIn(formData);
      set({ signInError: false });
      localStorage.setItem("profile", JSON.stringify({ ...data }));
      set({ authData: data });
      set({ isLogged: true });
      if (fromUpvote) {
        history.goBack();
      } else {
        history.push("/");
      }
    } catch (error: any) {
      set({ signInError: error.response.data.message });
      console.log(error);
    }
  },
  signUp: async (formData, history) => {
    try {
      const { data } = await api.signUp(formData);
      set({ signUpError: false });
      localStorage.setItem("profile", JSON.stringify({ ...data }));
      set({ authData: data });
      history.push("/login");
    } catch (error: any) {
      set({ signUpError: error.response.data.message });
      console.log(error);
    }
  },
  logOut: () => {
    localStorage.removeItem("profile");
    set({ isLogged: false });
  },
}));

export default authState;
