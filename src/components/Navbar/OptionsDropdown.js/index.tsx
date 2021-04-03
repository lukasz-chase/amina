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
//state
import viewState from "../../../state/viewState";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptionsDropdown: React.FC<Props> = ({ open, setOpen }) => {
  //state
  const darkMode = viewState((state) => state.darkMode);
  const changeDarkMode = viewState((state) => state.changeDarkMode);
  const handleChange = () => {
    changeDarkMode();
    setOpen(!open);
  };
  return (
    <Dropdown open={open} darkMode={darkMode}>
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
      <div className="login">
        <Option onClick={() => setOpen(!open)} darkMode={darkMode}>
          <BiDoorOpen className="option-icon" />
          Log In / Sign Up
        </Option>
      </div>
    </Dropdown>
  );
};

export default OptionsDropdown;
