import React, { useState } from "react";
//styling
import { Nav, Logo, TextInput, Buttons, Account } from "./NavbarStyles";
//image
import logo from "../../images/logo.png";
//material ui
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
//icons
import { BiSearchAlt } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { RiArrowDownSFill } from "react-icons/ri";
//components
import OptionsDropdown from "./OptionsDropdown.js";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Nav>
      <Logo>
        <img src={logo} alt="logo" className="logo-icon" />
        <h1>
          am<span>i</span>na
        </h1>
      </Logo>
      <TextInput>
        <Input
          className="textField"
          placeholder="Search"
          disableUnderline
          startAdornment={
            <InputAdornment position="start">
              <BiSearchAlt className="search-icon" />
            </InputAdornment>
          }
        />
      </TextInput>
      <Buttons>
        <button className="login">Log In</button>
        <button className="sign-up">Sign Up</button>
        <Account onClick={() => setOpen(!open)}>
          <MdAccountCircle className="account-icon" />
          <RiArrowDownSFill className="account-icon" />
        </Account>
      </Buttons>
      <OptionsDropdown open={open} setOpen={setOpen} />
    </Nav>
  );
};

export default Navbar;
