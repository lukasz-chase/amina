import React from "react";
//styling
import { ButtonComponent } from "./ButtonStyles";
//state
import viewState from "../../state/viewState";
import userState from "../../state/userState";
//interfaces
import { User } from "../../interfaces";

const BackToTopButton: React.FC = () => {
  //state
  const loggedUser = userState<User>((state) => state.loggedUser);
  const isLogged = userState<boolean>((state) => state.isLogged);
  const darkmodeState = viewState<boolean>((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;

  return (
    <ButtonComponent darkmode={darkMode} onClick={() => window.scrollTo(0, 0)}>
      Back to Top
    </ButtonComponent>
  );
};

export default BackToTopButton;
