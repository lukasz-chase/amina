import React from "react";
//styling
import { ButtonComponent } from "./ButtonStyles";
//state
import viewState from "../../state/viewState";
import userState from "../../state/userState";

const BackToTopButton = () => {
  //state
  const loggedUser = userState((state) => state.loggedUser);
  const isLogged = userState((state) => state.isLogged);
  const darkmodeState = viewState((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  return (
    <ButtonComponent darkmode={darkMode} onClick={() => window.scrollTo(0, 0)}>
      Back to Top
    </ButtonComponent>
  );
};

export default BackToTopButton;
