import React from "react";
//styling
import { CommunityComponent } from "./CommunityStyles";
//interface
import { Subamin, User } from "../../interfaces";
//router
import { Link } from "react-router-dom";
//store
import viewState from "../../state/viewState";
import userState from "../../state/userState";
import JoinButton from "../JoinButton";

type Props = {
  subamin: Subamin;
  search?: boolean;
};

const Community: React.FC<Props> = ({ subamin, search }) => {
  //state
  const loggedUser = userState<User>((state) => state.loggedUser);
  const isLogged = userState<boolean>((state) => state.isLogged);
  const darkmodeState = viewState<boolean>((state) => state.darkMode);
  const darkmode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  return (
    <CommunityComponent darkmode={darkmode}>
      <img src={subamin.logo} alt={subamin.name} />
      <div className="info">
        <Link to={`/s/${subamin.id}`} className="name">
          a/{subamin.name}
        </Link>
        <span className="members">
          {subamin.members} {subamin.members > 1 ? "members" : "member"}
        </span>
      </div>
      {search && <div className="desc">{subamin.desc}</div>}

      <JoinButton id={subamin.id} />
    </CommunityComponent>
  );
};

export default Community;
