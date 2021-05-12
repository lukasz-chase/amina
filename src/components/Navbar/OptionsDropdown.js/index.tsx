import React from "react";
//components
import { Dropdown, Option } from "./DropdownStyles";
//material ui
import Switch from "@material-ui/core/Switch";
//icons
import { BsMoon } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiCoinStack, BiDoorOpen } from "react-icons/bi";
import { GiCheckedShield } from "react-icons/gi";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { MdSettings, MdCreate } from "react-icons/md";
//state
import viewState from "../../../state/viewState";
import userState from "../../../state/userState";
//router
import { Link } from "react-router-dom";
//location
import { useHistory } from "react-router-dom";
//axios
import axios from "axios";
//interfaces
import { User } from "../../../interfaces";
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptionsDropdown: React.FC<Props> = ({ open, setOpen }) => {
  //state
  const loggedUser = userState<User>((state) => state.loggedUser);
  const isLogged = userState<boolean>((state) => state.isLogged);
  const fetchUser = userState((state) => state.fetchLoggedUser);
  const darkmodeState = viewState<boolean>((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const changeDarkModeState = viewState((state) => state.changeDarkMode);
  const logOut = userState((state) => state.logOut);
  const history = useHistory();

  //handlers
  const LogOutHandler = () => {
    localStorage.removeItem("userId");
    history.push("/login");
    setOpen(!open);
    logOut();
  };
  const darkModeHandler = () => {
    axios
      .put(`https://amina-server.herokuapp.com/users/${loggedUser.id}`, {
        id: loggedUser.id,
        username: loggedUser.username,
        email: loggedUser.email,
        password: loggedUser.password,
        followedSubaminas: loggedUser.followedSubaminas,
        savedPosts: loggedUser.savedPosts,
        darkMode: !loggedUser.darkMode,
        logo: loggedUser.logo,
        birthday: loggedUser.birthday,
      })
      .then(() => {
        fetchUser(loggedUser.id);
      });
  };
  const handleChange = () => {
    isLogged ? darkModeHandler() : changeDarkModeState();
    setOpen(!open);
  };
  const linkHandler = () => {
    setOpen(!open);
    window.scrollTo(0, 0);
  };
  return (
    <Dropdown open={open} darkMode={darkMode}>
      {isLogged && (
        <div className="my-stuff">
          <div className="header">MY STUFF</div>
          <Link
            to={`/user/${loggedUser.id}`}
            className="link"
            onClick={() => linkHandler()}
          >
            <Option darkMode={darkMode}>
              <CgProfile className="option-icon" />
              Profile
            </Option>
          </Link>
          <Link
            to={`/user/${loggedUser.id}/settings`}
            className="link"
            onClick={() => linkHandler()}
          >
            <Option darkMode={darkMode}>
              <MdSettings className="option-icon" />
              User Setting
            </Option>
          </Link>
          <Link
            to={`/create/post`}
            className="link sm"
            onClick={() => linkHandler()}
          >
            <Option darkMode={darkMode}>
              <MdCreate className="option-icon" />
              Create Post
            </Option>
          </Link>
          <Link
            to={`/create/subamin`}
            className="link sm"
            onClick={() => linkHandler()}
          >
            <Option darkMode={darkMode}>
              <AiOutlineUsergroupAdd className="option-icon" />
              Create Subamin
            </Option>
          </Link>
        </div>
      )}
      <div className="options">
        <span className="header">VIEW OPTIONS</span>
        <Option darkMode={darkMode}>
          <BsMoon className="option-icon" />
          Night Mode
          <Switch checked={darkMode} onChange={handleChange} color="primary" />
        </Option>
      </div>
      <div className="stuff">
        <span className="header">MORE STUFF</span>
        <Option onClick={() => setOpen(!open)} darkMode={darkMode}>
          <BiCoinStack className="option-icon" />
          Amina Coins
        </Option>
        <Option onClick={() => setOpen(!open)} darkMode={darkMode}>
          <GiCheckedShield className="option-icon" />
          Amina Premium
        </Option>
        <Option onClick={() => setOpen(!open)} darkMode={darkMode}>
          <HiOutlineQuestionMarkCircle className="option-icon" />
          Help Center
        </Option>
      </div>
      {isLogged ? (
        <Option onClick={() => LogOutHandler()} darkMode={darkMode}>
          <RiLogoutBoxRFill className="option-icon" />
          Log Out
        </Option>
      ) : (
        <Link
          to="/login"
          className="login"
          onClick={() => window.scrollTo(0, 0)}
        >
          <Option onClick={() => setOpen(!open)} darkMode={darkMode}>
            <BiDoorOpen className="option-icon" />
            Log In / Sign Up
          </Option>
        </Link>
      )}
    </Dropdown>
  );
};

export default OptionsDropdown;
