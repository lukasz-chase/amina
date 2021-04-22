import React from "react";
//styles
import { Button } from "./ButtonStyles";
//store
import viewState from "../../state/viewState";
import userState from "../../state/userState";

const JoinButton = () => {
  //state
  const loggedUser = userState((state) => state.loggedUser);
  const isLogged = userState((state) => state.isLogged);
  const darkmodeState = viewState((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const classicView: boolean = viewState((state) => state.classicView);
  const compactView: boolean = viewState((state) => state.compactView);
  return (
    <Button
      $darkmode={darkMode}
      $classicview={classicView}
      $compactview={compactView}
      $islogged={isLogged}
    >
      <button className="join-button">
        + <span>Join</span>
      </button>
    </Button>
  );
};

export default JoinButton;
