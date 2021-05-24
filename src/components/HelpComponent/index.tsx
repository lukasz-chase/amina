import React from "react";
//styling
import { HelpWrapper } from "./HelpStyles";
//state
import viewState from "../../state/viewState";
import userState from "../../state/userState";
//interfaces
import { User } from "../../interfaces";

const HelpComponent: React.FC = () => {
  //state
  const loggedUser = userState<User>((state) => state.loggedUser);
  const isLogged = userState<boolean>((state) => state.isLogged);
  const darkmodeState = viewState<boolean>((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  return (
    <HelpWrapper darkmode={darkMode}>
      <table>
        <tr>
          <td>Help</td>
          <td>About</td>
        </tr>
        <tr>
          <td>Amina App</td>
          <td>Carrer</td>
        </tr>
        <tr>
          <td>Amina Coins</td>
          <td>Press</td>
        </tr>
        <tr>
          <td>Amina Premium</td>
          <td>Advertise</td>
        </tr>
        <tr>
          <td>Amina Gifts</td>
          <td>Blog</td>
        </tr>
        <tr>
          <td>Communities</td>
          <td>Terms</td>
        </tr>
        <tr>
          <td>Amamina</td>
          <td>Content Policy</td>
        </tr>
        <tr>
          <td>Topics</td>
          <td>Mod Policy</td>
        </tr>
      </table>
      <span>Amina Inc 2021.All rights reserved</span>
    </HelpWrapper>
  );
};

export default HelpComponent;
