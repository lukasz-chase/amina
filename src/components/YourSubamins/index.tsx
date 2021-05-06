import React, { useState, useEffect } from "react";
//styling
import { SubaminsDropdown, Community } from "./YourSubaminsStyles";
//store
import viewState from "../../state/viewState";
import userState from "../../state/userState";
import subaminsState from "../../state/subaminsState";
//material ui
import Input from "@material-ui/core/Input";
//icons
import { AiFillHome } from "react-icons/ai";
//location
import { useHistory } from "react-router-dom";
//interface
import { Subamin, User } from "../../interfaces";
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  width: string;
  nav?: boolean;
  setActiveCommunity?: React.Dispatch<
    React.SetStateAction<Subamin | undefined>
  >;
}

const YourSubamins: React.FC<Props> = ({
  open,
  setOpen,
  width,
  nav,
  setActiveCommunity,
}) => {
  //state
  const loggedUser = userState<User>((state) => state.loggedUser);
  const isLogged = userState<boolean>((state) => state.isLogged);
  const darkmodeState = viewState<boolean>((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const fetchSubamins = subaminsState((state) => state.fetchUsersSubamins);
  const usersSubamins = subaminsState((s) => s.usersSubaminas);
  const [community, setCommunity] = useState<string>("");
  const history = useHistory();
  //useEffect
  useEffect(() => {
    if (isLogged) {
      fetchSubamins(loggedUser.followedSubaminas, community);
    }
  }, [fetchSubamins, loggedUser.followedSubaminas, community, isLogged]);
  //handlers
  const clickHandler = (path?: string, subamin?: Subamin) => {
    if (nav) {
      setOpen(!open);
      window.scrollTo(0, 0);
      history.push(path!);
    } else {
      setOpen(!open);
      setActiveCommunity!(subamin);
    }
  };
  return (
    <SubaminsDropdown darkmode={darkMode} open={open} width={width}>
      <div className="text-input">
        <Input
          className="textField"
          placeholder="Search"
          value={community}
          onChange={(e) => setCommunity(e.target.value)}
          disableUnderline
        />
      </div>
      {nav && <span> Amina feeds </span>}
      {nav && (
        <Community darkmode={darkMode} onClick={() => clickHandler("/")}>
          <AiFillHome className="community-icon" /> Home
        </Community>
      )}

      <span>my communities</span>
      {usersSubamins.map((subamin) => (
        <Community
          darkmode={darkMode}
          onClick={() => clickHandler(`/s/${subamin.id}`, subamin)}
          key={subamin.id}
        >
          <img src={subamin.logo} alt={subamin.name} /> {subamin.name}
        </Community>
      ))}
    </SubaminsDropdown>
  );
};

export default YourSubamins;
