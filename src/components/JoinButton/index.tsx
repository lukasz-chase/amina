import React from "react";
//styles
import { Button } from "./ButtonStyles";
//store
import viewState from "../../state/viewState";
const JoinButton = () => {
  //state
  const darkMode: boolean = viewState((state) => state.darkMode);
  const classicView: boolean = viewState((state) => state.classicView);
  const compactView: boolean = viewState((state) => state.compactView);
  return (
    <Button
      $darkmode={darkMode}
      $classicview={classicView}
      $compactview={compactView}
    >
      <button className="join-button">
        + <span>Join</span>
      </button>
    </Button>
  );
};

export default JoinButton;
