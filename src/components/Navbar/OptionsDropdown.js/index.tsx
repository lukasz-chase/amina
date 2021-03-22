import React, { useState } from "react";
//components
import { Dropdown, Option } from "./DropdownStyles";
//material ui
import Switch from "@material-ui/core/Switch";
//icons
import { BsMoon } from "react-icons/bs";
import { BiCoinStack, BiDoorOpen } from "react-icons/bi";
import { GiCheckedShield } from "react-icons/gi";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptionsDropdown: React.FC<Props> = ({ open, setOpen }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const handleChange = (event: any) => {
    setDarkMode(event.target.checked);
  };
  return (
    <Dropdown open={open}>
      <div className="options">
        <span className="header">VIEW OPTIONS</span>
        <Option>
          <BsMoon className="option-icon" />
          Night Mode
          <Switch checked={darkMode} onChange={handleChange} color="primary" />
        </Option>
      </div>
      <div className="stuff">
        <span className="header">MORE STUFF</span>
        <Option onClick={() => setOpen(!open)}>
          <BiCoinStack className="option-icon" />
          Amina Coins
        </Option>
        <Option onClick={() => setOpen(!open)}>
          <GiCheckedShield className="option-icon" />
          Amina Premium
        </Option>
        <Option onClick={() => setOpen(!open)}>
          <HiOutlineQuestionMarkCircle className="option-icon" />
          Help Center
        </Option>
      </div>
      <div className="login">
        <Option onClick={() => setOpen(!open)}>
          <BiDoorOpen className="option-icon" />
          Log In / Sign Up
        </Option>
      </div>
    </Dropdown>
  );
};

export default OptionsDropdown;
