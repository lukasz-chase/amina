import React from "react";
//styling
import { HeaderComponent, Button, ViewOption } from "./HeaderStyles";
//store
import viewState from "../../state/viewState";
//icons
import { AiOutlineLineChart } from "react-icons/ai";
import { MdNewReleases } from "react-icons/md";

type HeaderProps = {
  topFunction: (question?: string) => void;
  newFunction: (question?: string) => void;
  question?: string;
};

const Header: React.FC<HeaderProps> = ({
  topFunction,
  newFunction,
  question,
}) => {
  //state
  const darkMode: boolean = viewState((state) => state.darkMode);
  const setClassicView = viewState((state) => state.setClassicView);
  const setCompactView = viewState((state) => state.setCompactView);
  return (
    <HeaderComponent darkmode={darkMode}>
      <div className="buttons">
        <Button darkmode={darkMode} onClick={() => topFunction(question)}>
          <AiOutlineLineChart className="button-icon" />
          Top
        </Button>
        <Button darkmode={darkMode} onClick={() => newFunction(question)}>
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
