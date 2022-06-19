import create from "zustand";
//interfaces
import { PostProperties, Subamin } from "../interfaces";
//api
import * as api from "../api";

type Store = {
  subamins: Subamin[];
  allSubamins: Subamin[];
  usersFeed: PostProperties[];
  usersSubaminas: Subamin[];
  limit: number;
  subamin: Subamin;
  isLoading: boolean;
  getTopSubamins: () => void;
  joinSubamin: (userId: String, subaminId: String) => void;
  fetchUsersSubaminsBySearch: (id: String, searchQuery: string) => void;
  changeLimit: (by: number) => void;
  setCommunity: (subamin2?: Subamin) => void;
  createSubamin: (subaminData: any, history: any) => void;
  editSubamin: (id: String, subaminData: any, history: any) => void;
};

export const subaminsState = create<Store>((set) => ({
  subamins: [],
  isLoading: true,
  allSubamins: [],
  usersFeed: [],
  subamin: {
    _id: "0",
    name: "loading",
    members: 1,
    logo: "loading",
    desc: "loading",
    createdAt: "loading",
    authorId: "1",
  },
  createSubamin: async (subaminData, history) => {
    try {
      const { data } = await api.createSubamin(subaminData);
      set((state) => ({ subamins: [...state.subamins, data] }));
      history.push(`/s/${data._id}`);
    } catch (error) {
      console.log(error);
    }
  },
  editSubamin: async (id, subaminData, history) => {
    try {
      const { data } = await api.editSubamin(id, subaminData);
      set((state) => ({
        subamins: state.subamins.map((subamin) =>
          subamin._id === data._id ? data : subamin
        ),
      }));
      history.push(`/s/${data._id}`);
    } catch (error) {
      console.log(error);
    }
  },
  joinSubamin: async (userId, subaminId) => {
    try {
      const { data } = await api.joinSubamin(userId, subaminId);
      set((state) => ({
        usersSubaminas: [...state.usersSubaminas, data.user],
      }));
      set((state) => ({
        subamins: state.subamins.map((subamin) =>
          subamin._id === subaminId ? data.subamin : subamin
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  },
  setCommunity: (subamin2) => set(() => ({ subamin: subamin2! })),
  limit: 20,
  changeLimit: (by: number) => set((state) => ({ limit: state.limit + by })),
  getTopSubamins: async () => {
    try {
      const { data } = await api.getTopSubamins();
      set({ subamins: data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchUsersSubaminsBySearch: async (id, searchQuery) => {
    try {
      const { data } = await api.getUserSubaminsBySearch(id, searchQuery);
      set({ usersSubaminas: data });
    } catch (error) {
      console.log(error);
    }
  },
  usersSubaminas: [],
}));

export default subaminsState;
