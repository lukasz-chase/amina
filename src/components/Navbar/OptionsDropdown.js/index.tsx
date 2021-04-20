import React from "react";
//components
import { Dropdown, Option } from "./DropdownStyles";
//material ui
import Switch from "@material-ui/core/Switch";
//icons
import { BsMoon } from "react-icons/bs";
import { BiCoinStack, BiDoorOpen } from "react-icons/bi";
import { GiCheckedShield } from "react-icons/gi";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { MdSettings } from "react-icons/md";
//state
import viewState from "../../../state/viewState";
import userState from "../../../state/userState";
//router
import { Link } from "react-router-dom";
//location
import { useHistory } from "react-router-dom";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptionsDropdown: React.FC<Props> = ({ open, setOpen }) => {
  //state
  const loggedUser = userState((state) => state.loggedUser);
  const isLogged = userState((state) => state.isLogged);
  const darkmodeState = viewState((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const changeDarkMode = viewState((state) => state.changeDarkMode);
  const logOut = userState((state) => state.logOut);
  const history = useHistory();
  //handlers
  const handleChange = () => {
    changeDarkMode();
    setOpen(!open);
  };
  const LogOutHandler = () => {
    localStorage.removeItem("userId");
    history.push("/login");
    setOpen(!open);
    logOut();
  };
  return (
    <Dropdown open={open} darkMode={darkMode}>
      {isLogged && (
        <div className="my-stuff">
          <div className="header">MY STUFF</div>
          <Option darkMode={darkMode}>
            <CgProfile className="option-icon" />
            Profile
          </Option>
          <Option darkMode={darkMode}>
            <MdSettings className="option-icon" />
            User Setting
          </Option>
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
        <Link to="/login" className="login">
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
