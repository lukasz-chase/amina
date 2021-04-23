import React from "react";
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
  const isJoined =
    isLoggedState && loggedUser.followedSubaminas.find((a) => a === id)
      ? false
      : true;
  const darkmodeState = viewState((state) => state.darkMode);
  const darkMode: boolean = isLoggedState ? loggedUser.darkMode : darkmodeState;
  const classicView: boolean = viewState((state) => state.classicView);
  const compactView: boolean = viewState((state) => state.compactView);

  //handlers
  const joinHandler = () => {
    axios.put(`http://localhost:3000/users/${loggedUser.id}`, {
      username: loggedUser.username,
      email: loggedUser.email,
      password: loggedUser.password,
      followedSubaminas: [...loggedUser.followedSubaminas, id],
      id: loggedUser.id,
      darkMode: loggedUser.darkMode,
    });
  };

  return (
    <Button
      $darkmode={darkMode}
      $classicview={classicView}
      $compactview={compactView}
      $islogged={isLoggedState ? isJoined : isLoggedState}
      onClick={(e) => {
        e.stopPropagation();
        joinHandler();
      }}
    >
      <button className="join-button">
        + <span>Join</span>
      </button>
    </Button>
  );
};

export default JoinButton;
