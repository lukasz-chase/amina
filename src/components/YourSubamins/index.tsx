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
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const YourSubamins: React.FC<Props> = ({ open, setOpen }) => {
  //state
  const loggedUser = userState((state) => state.loggedUser);
  const isLogged = userState((state) => state.isLogged);
  const darkmodeState = viewState((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const fetchSubamins = subaminsState((state) => state.fetchUsersSubamins);
  const usersSubamins = subaminsState((s) => s.usersSubaminas);
  const [community, setCommunity] = useState("");
  //useEffect
  useEffect(() => {
    fetchSubamins(loggedUser.followedSubaminas, community);
  }, [fetchSubamins, loggedUser.followedSubaminas, community]);
  //handlers
  const clickHandler = () => {
    setOpen(!open);
    window.scrollTo(0, 0);
  };
  return (
    <SubaminsDropdown darkmode={darkMode} open={open}>
      <div className="text-input">
        <Input
          className="textField"
          placeholder="Search"
          value={community}
          onChange={(e) => setCommunity(e.target.value)}
          disableUnderline
        />
      </div>
      <span> Amina feeds </span>
      <Community
        darkmode={darkMode}
        open={open}
        to="/"
        onClick={() => clickHandler()}
      >
        <AiFillHome className="community-icon" /> Home
      </Community>
      <span>my communities</span>
      {usersSubamins.map((subamin) => (
        <Community
          darkmode={darkMode}
          open={open}
          to={`/s/${subamin.id}`}
          onClick={() => clickHandler()}
        >
          <img src={subamin.logo} alt={subamin.name} /> {subamin.name}
        </Community>
      ))}
    </SubaminsDropdown>
  );
};

export default YourSubamins;
