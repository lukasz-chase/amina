//icons
import { CgProfile } from "react-icons/cg";
import { MdSettings, MdCreate } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiCoinStack } from "react-icons/bi";
import { GiCheckedShield } from "react-icons/gi";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";

export const loggedUserLinks = [
  {
    label: "Profile",
    path: (id: String) => `/user/${id}`,
    className: "link",
    icon: <CgProfile className="option-icon" />,
  },
  {
    label: "User Settings",
    path: (id: String) => `/user/${id}/settings`,
    className: "link",
    icon: <MdSettings className="option-icon" />,
  },
  {
    label: "Create Post",
    path: () => `/create/post`,
    className: "link sm",
    icon: <MdCreate className="option-icon" />,
  },
  {
    label: "Create Subamin",
    path: () => `/create/subamin`,
    className: "link sm",
    icon: <AiOutlineUsergroupAdd className="option-icon" />,
  },
];
export const stuffLinks = [
  {
    label: "Amina Coins",
    icon: <BiCoinStack className="option-icon" />,
  },
  {
    label: "Amina Premium",
    icon: <GiCheckedShield className="option-icon" />,
  },
  {
    label: "Help Center",
    icon: <HiOutlineQuestionMarkCircle className="option-icon" />,
  },
];
export const accountLinks = [
  {
    label: "Saved posts",
    path: (id: String) => `/user/${id}/saved`,
    className: "saved-posts",
  },
  {
    label: "Your posts",
    path: (id: String) => `/user/${id}`,
    className: "saved-posts",
  },
  {
    label: "New Post",
    path: () => `/create/post`,
    className: "new-post",
  },
  {
    label: <IoMdSettings className="user-settings" />,
    path: (id: String) => `/user/${id}/settings`,
  },
];
export const helpLinks = [
  {
    row1: "Help",
    row2: "About",
  },
  {
    row1: "Amina App",
    row2: "Carrer",
  },
  {
    row1: "Amina Coins",
    row2: "Press",
  },
  {
    row1: "Amina Premium",
    row2: "Advertise",
  },
  {
    row1: "Amina Gifts",
    row2: "Blog",
  },
  {
    row1: "Communities",
    row2: "Terms",
  },
  {
    row1: "Amamina",
    row2: "Content Policy",
  },
  {
    row1: "Topics",
    row2: "Mod Policy",
  },
];
