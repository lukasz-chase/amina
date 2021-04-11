import create from "zustand";
//api
import { subaminDetails } from "../api";
//interfaces
import { Subamin } from "../interfaces";

type Store = {
  subamin: Subamin;
  fetchSubamin: (id: number) => void;
};

const subaminState = create<Store>((set) => ({
  subamin: {
    id: 1,
    name: "loading",
    members: 1,
    logo: "loading",
    desc: "loading",
  },
  fetchSubamin: async (id) => {
    const response = await fetch(subaminDetails(id));
    set({ subamin: await response.json() });
  },
}));

export default subaminState;
