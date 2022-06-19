import React, { useState, useEffect } from "react";
//styling
import { SubaminsDropdown, Community } from "./YourSubaminsStyles";
//store
import viewState from "../../state/viewState";
import userState from "../../state/userState";
import subaminsState from "../../state/subaminsState";
import authState from "../../state/authState";
//material ui
//icons
import { AiFillHome } from "react-icons/ai";
//location
import { useHistory } from "react-router-dom";
//interface
import { Subamin, User } from "../../interfaces";
//components
import Input from "../Input";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  width: string;
  nav?: boolean;
}

const YourSubamins: React.FC<Props> = ({ open, setOpen, width, nav }) => {
  //state
  const loggedUser = userState<User>((state) => state.loggedUser);
  const isLogged = authState<boolean>((state) => state.isLogged);
  const darkmodeState = viewState<boolean>((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const { fetchUsersSubaminsBySearch, usersSubaminas, setCommunity } =
    subaminsState((state) => state);
  const [search, setSearch] = useState<string>("");
  const history = useHistory();
  //useEffect
  useEffect(() => {
    if (isLogged) {
      fetchUsersSubaminsBySearch(loggedUser._id, search);
    }
  }, [fetchUsersSubaminsBySearch, loggedUser._id, isLogged, search]);
  //handlers
  const clickHandler = (path?: string, subamin?: Subamin) => {
    if (nav) {
      setOpen(!open);
      window.scrollTo(0, 0);
      history.push(path!);
    } else {
      setOpen(!open);
      setCommunity(subamin);
    }
  };
  return (
    <SubaminsDropdown darkmode={darkMode} open={open} width={width}>
      <div className="text-input">
        <Input
          name="search"
          value={search}
          handleChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {nav && <span> Amina feeds </span>}
      {nav && (
        <Community darkmode={darkMode} onClick={() => clickHandler("/")}>
          <AiFillHome className="community-icon" /> Home
        </Community>
      )}

      <span>my communities</span>
      {usersSubaminas.map((subamin, i) => (
        <Community
          darkmode={darkMode}
          onClick={() => clickHandler(`/s/${subamin._id}`, subamin)}
          key={i}
        >
          <img src={subamin.logo} alt={subamin.name} /> {subamin.name}
        </Community>
      ))}
    </SubaminsDropdown>
  );
};

export default YourSubamins;
