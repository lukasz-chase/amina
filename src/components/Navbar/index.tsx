import React, { useState } from "react";
//styling
import { Nav, Logo, TextInput, Buttons, Account } from "./NavbarStyles";
//image
import logo from "../../images/logo.png";
//location
import { useHistory } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { Location } from "history";
//material ui
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
//icons
import { BiSearchAlt } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { RiArrowDownSFill } from "react-icons/ri";
import { MdArrowDropDown } from "react-icons/md";
import { AiFillEdit, AiOutlineUsergroupAdd, AiFillHome } from "react-icons/ai";
//components
import OptionsDropdown from "./OptionsDropdown.js";
//store
import viewState from "../../state/viewState";
import userState from "../../state/userState";
import subaminState from "../../state/subaminDetailsState";
import YourSubamins from "../YourSubamins";

const Navbar: React.FC = () => {
  //state
  const [open, setOpen] = useState<boolean>(false);
  const [openCommunity, setOpenCommunity] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const history = useHistory();
  const loggedUser = userState((state) => state.loggedUser);
  const isLogged = userState((state) => state.isLogged);
  const darkmodeState = viewState((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const location = useLocation<Location>();
  const site = location.pathname.split("/")[1];
  const subamin = subaminState((state) => state.subamin);
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
      {!site && (
        <div className="wrapper">
          <div
            className="community"
            onClick={() => setOpenCommunity(!openCommunity)}
          >
            {" "}
            <div className="info">
              <AiFillHome className="community-icon" /> Home
            </div>
            <div className="arrow">
              <MdArrowDropDown className="arrow-icon" />
            </div>
          </div>
          <YourSubamins
            open={openCommunity}
            setOpen={setOpenCommunity}
            width="15vw"
            nav
          />
        </div>
      )}
      {site === "s" && (
        <div className="wrapper">
          <div
            className="community"
            onClick={() => setOpenCommunity(!openCommunity)}
          >
            <div className="info">
              <img src={subamin.logo} alt={subamin.name} /> {subamin.name}
            </div>
            <div className="arrow">
              <MdArrowDropDown className="arrow-icon" />
            </div>
          </div>
          <YourSubamins
            open={openCommunity}
            setOpen={setOpenCommunity}
            width="15vw"
            nav
          />
        </div>
      )}
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
      {isLogged && (
        <div className="icons">
          <Link to="/create/post">
            <Tooltip title="Create Post">
              <IconButton>
                <AiFillEdit className="icon" />
              </IconButton>
            </Tooltip>
          </Link>
          <Link to="/create/subamin">
            <Tooltip title="Create Community">
              <IconButton>
                <AiOutlineUsergroupAdd className="icon" />
              </IconButton>
            </Tooltip>
          </Link>
        </div>
      )}
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
