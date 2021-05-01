import React from "react";
//styling
import { HeaderComponent, Button, ViewOption } from "./HeaderStyles";
//store
import viewState from "../../state/viewState";
import userState from "../../state/userState";
import subaminsState from "../../state/subaminsState";
//icons
import { AiOutlineLineChart } from "react-icons/ai";
import { MdNewReleases } from "react-icons/md";

type HeaderProps = {
  topFunction?: (question?: string) => void;
  newFunction?: (question?: string) => void;
  question?: string;
  id?: number;
  subamin?: boolean;
  feed?: boolean;
  topSubaminFunction?: (id?: number) => void;
  newSubaminFunction?: (id?: number) => void;
};

const Header: React.FC<HeaderProps> = ({
  topFunction,
  newFunction,
  topSubaminFunction,
  newSubaminFunction,
  question,
  id,
  subamin,
  feed,
}) => {
  //state
  const setClassicView = viewState((state) => state.setClassicView);
  const setCompactView = viewState((state) => state.setCompactView);
  const loggedUser = userState((state) => state.loggedUser);
  const isLogged = userState((state) => state.isLogged);
  const darkmodeState = viewState((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const fetchTopFeed = subaminsState((state) => state.fetchTopSubaminByIds);
  const fetchNewFeed = subaminsState((state) => state.fetchNewSubaminByIds);
  //handlers
  const topFunctionHandler = () => {
    if (subamin) {
      topSubaminFunction!(id);
    } else if (feed) {
      fetchTopFeed(loggedUser.followedSubaminas);
    } else {
      topFunction!(question);
    }
  };
  const newFunctionHandler = () => {
    if (subamin) {
      newSubaminFunction!(id);
    } else if (feed) {
      fetchNewFeed(loggedUser.followedSubaminas);
    } else {
      newFunction!(question);
    }
  };
  return (
    <HeaderComponent darkmode={darkMode}>
      <div className="buttons">
        <Button darkmode={darkMode} onClick={() => topFunctionHandler()}>
          <AiOutlineLineChart className="button-icon" />
          Top
        </Button>
        <Button darkmode={darkMode} onClick={() => newFunctionHandler()}>
          <MdNewReleases className="button-icon" />
          New
        </Button>
      </div>
      <div className="view">
        <ViewOption
          darkMode={darkMode}
          height="12px"
          mobileHeight="9px"
          onClick={() => setClassicView(false)}
        >
          <div className="lines">
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <span>Card</span>
        </ViewOption>
        <ViewOption
          darkMode={darkMode}
          height="7px"
          mobileHeight="6px"
          onClick={() => setClassicView(true)}
        >
          <div className="lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <span>Classic</span>
        </ViewOption>
        <ViewOption
          darkMode={darkMode}
          height="5px"
          mobileHeight="3px"
          onClick={() => setCompactView(true)}
        >
          <div className="lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <span>Compact</span>
        </ViewOption>
      </div>
    </HeaderComponent>
  );
};

export default Header;
