import React from "react";
//components
import { Dropdown, Option } from "./DropdownStyles";
//material ui
import Switch from "@material-ui/core/Switch";
//icons
import { BsMoon } from "react-icons/bs";
import { BiDoorOpen } from "react-icons/bi";
import { RiLogoutBoxRFill } from "react-icons/ri";
//state
import viewState from "../../../state/viewState";
import userState from "../../../state/userState";
//router
import { Link } from "react-router-dom";
//location
import { useHistory } from "react-router-dom";
//interfaces
import { User } from "../../../interfaces";
//data
import { loggedUserLinks, stuffLinks } from "../../../descriptions/links";
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptionsDropdown: React.FC<Props> = ({ open, setOpen }) => {
  //state
  const loggedUser = userState<User>((state) => state.loggedUser);
  const isLogged = userState<boolean>((state) => state.isLogged);
  const darkModeState = viewState((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkModeState;
  const changeDarkModeState = viewState((state) => state.changeDarkMode);
  const changeDarkMode = userState((state) => state.changeDarkMode);
  const logOut = userState((state) => state.logOut);
  const history = useHistory();

  //handlers
  const LogOutHandler = () => {
    history.push("/login");
    setOpen(!open);
    logOut();
  };
  const handleChange = () => {
    isLogged ? changeDarkMode(loggedUser._id) : changeDarkModeState();
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
          {loggedUserLinks.map((link) => (
            <Link
              to={link.path(loggedUser._id)}
              className={link.className}
              key={link.label}
              onClick={() => linkHandler()}
            >
              <Option darkMode={darkMode}>
                {link.icon}
                {link.label}
              </Option>
            </Link>
          ))}
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
        {stuffLinks.map((link) => (
          <Option
            onClick={() => setOpen(!open)}
            darkMode={darkMode}
            key={link.label}
          >
            {link.icon}
            {link.label}
          </Option>
        ))}
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
