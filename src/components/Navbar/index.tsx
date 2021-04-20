import React, { useState } from "react";
//styling
import { Nav, Logo, TextInput, Buttons, Account } from "./NavbarStyles";
//image
import logo from "../../images/logo.png";
//location
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
//material ui
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
//icons
import { BiSearchAlt } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { RiArrowDownSFill } from "react-icons/ri";
//components
import OptionsDropdown from "./OptionsDropdown.js";
//store
import viewState from "../../state/viewState";
import userState from "../../state/userState";

const Navbar: React.FC = () => {
  //state
  const [open, setOpen] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const history = useHistory();
  const loggedUser = userState((state) => state.loggedUser);
  const isLogged = userState((state) => state.isLogged);
  const darkmodeState = viewState((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  //handlers
  const searchHandler = (text: string) => {
    if (question !== "") {
      history.push(`/search/subaminas/${text}`);
      setQuestion("");
    }
  };
  return (
    <Nav $darkmode={darkMode}>
      <Logo $darkmode={darkMode} to="/">
        <img src={logo} alt="logo" className="logo-icon" />
        <h1>
          am<span>i</span>na
        </h1>
      </Logo>
      <TextInput $darkmode={darkMode}>
        <Input
          className="textField"
          placeholder="Search"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? searchHandler(question) : "")}
          disableUnderline
          startAdornment={
            <InputAdornment position="start">
              <BiSearchAlt
                className="search-icon"
                onClick={() => searchHandler(question)}
              />
            </InputAdornment>
          }
        />
      </TextInput>

      <Buttons $darkmode={darkMode}>
        {!isLogged && (
          <>
            <Link className="login" to="/login">
              Log In
            </Link>
            <Link className="sign-up" to="/register">
              Sign Up
            </Link>
          </>
        )}
        <Account onClick={() => setOpen(!open)} $darkmode={darkMode}>
          {isLogged && <span className="name">{loggedUser.username}</span>}
          <MdAccountCircle className="account-icon" />
          <RiArrowDownSFill className="account-icon" />
        </Account>
      </Buttons>

      <OptionsDropdown open={open} setOpen={setOpen} />
    </Nav>
  );
};

export default Navbar;
