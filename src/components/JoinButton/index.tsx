import React, { useState } from "react";
//styles
import { Button } from "./ButtonStyles";
//store
import viewState from "../../state/viewState";
import userState from "../../state/userState";
import axios from "axios";

type joinProps = {
  id: number;
};

const JoinButton: React.FC<joinProps> = ({ id }) => {
  //state
  const loggedUser = userState((state) => state.loggedUser);
  const isLoggedState = userState((state) => state.isLogged);
  const [isJoined, setIsJoined] = useState(
    isLoggedState && loggedUser.followedSubaminas.find((a) => a === id)
      ? true
      : false
  );
  const darkmodeState = viewState((state) => state.darkMode);
  const darkMode: boolean = isLoggedState ? loggedUser.darkMode : darkmodeState;
  const classicView: boolean = viewState((state) => state.classicView);
  const compactView: boolean = viewState((state) => state.compactView);
  //handlers
  const joinHandler = () => {
    axios
      .put(`http://localhost:3000/users/${loggedUser.id}`, {
        username: loggedUser.username,
        email: loggedUser.email,
        password: loggedUser.password,
        followedSubaminas: [...loggedUser.followedSubaminas, id],
        id: loggedUser.id,
        darkMode: loggedUser.darkMode,
      })
      .then(() => {
        setIsJoined(true);
      });
  };
  const leaveHandler = () => {
    axios
      .put(`http://localhost:3000/users/${loggedUser.id}`, {
        username: loggedUser.username,
        email: loggedUser.email,
        password: loggedUser.password,
        followedSubaminas: loggedUser.followedSubaminas.filter((a) => a !== id),
        id: loggedUser.id,
        darkMode: loggedUser.darkMode,
      })
      .then(() => {
        setIsJoined(false);
      });
  };
  return (
    <Button
      $darkmode={darkMode}
      $classicview={classicView}
      $compactview={compactView}
      $islogged={isLoggedState}
      onClick={(e) => {
        e.stopPropagation();
        if (isJoined) {
          leaveHandler();
        } else {
          joinHandler();
        }
      }}
    >
      <button className="join-button">
        {isJoined ? "" : "+"} <span>{isJoined ? "Joined" : "Join"}</span>
      </button>
    </Button>
  );
};

export default JoinButton;
