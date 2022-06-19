import React from "react";
//styling
import { HelpWrapper } from "./HelpStyles";
//state
import viewState from "../../state/viewState";
import userState from "../../state/userState";
//interfaces
import { User } from "../../interfaces";
//data
import { helpLinks } from "../../descriptions/links";

const HelpComponent: React.FC = () => {
  //state
  const loggedUser = userState<User>((state) => state.loggedUser);
  const isLogged = userState<boolean>((state) => state.isLogged);
  const darkmodeState = viewState<boolean>((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  return (
    <HelpWrapper darkmode={darkMode}>
      <table>
        <tbody>
          {helpLinks.map((link) => (
            <tr key={link.row1}>
              <td>{link.row1}</td>
              <td>{link.row2}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <span>Amina Inc 2021.All rights reserved</span>
    </HelpWrapper>
  );
};

export default HelpComponent;
