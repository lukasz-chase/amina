import React, { useState } from "react";
//styling
import { HeaderComponent, Button, ViewOption } from "./HeaderStyles";
//store
import viewState from "../../state/viewState";
import userState from "../../state/userState";
import subaminsState from "../../state/subaminsState";
//icons
import { AiOutlineLineChart } from "react-icons/ai";
import { MdNewReleases } from "react-icons/md";
import { RiArrowDownSFill } from "react-icons/ri";
//interfaces
import { User } from "../../interfaces";

type HeaderProps = {
  topFunction?: (limit: number, question?: string) => void;
  newFunction?: (limit: number, question?: string) => void;
  question?: string;
  id?: number;
  subamin?: boolean;
  feed?: boolean;
  limit: number;
  topSubaminFunction?: (limit: number, id?: number) => void;
  newSubaminFunction?: (limit: number, id?: number) => void;
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
  limit,
}) => {
  //state
  const setClassicView = viewState((state) => state.setClassicView);
  const setCompactView = viewState((state) => state.setCompactView);
  const compactView = viewState((state) => state.compactView);
  const classicView = viewState((state) => state.classicView);
  const loggedUser = userState<User>((state) => state.loggedUser);
  const isLogged = userState<boolean>((state) => state.isLogged);
  const darkmodeState = viewState<boolean>((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const fetchTopFeed = subaminsState((state) => state.fetchTopSubaminByIds);
  const fetchNewFeed = subaminsState((state) => state.fetchNewSubaminByIds);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  //handlers
  const topFunctionHandler = () => {
    setActive(true);
    if (subamin) {
      topSubaminFunction!(limit, id);
    } else if (feed) {
      fetchTopFeed(loggedUser.followedSubaminas, limit);
    } else {
      topFunction!(limit, question);
    }
  };

  const newFunctionHandler = () => {
    setActive(false);
    if (subamin) {
      newSubaminFunction!(limit, id);
    } else if (feed) {
      fetchNewFeed(loggedUser.followedSubaminas, limit);
    } else {
      newFunction!(limit, question);
    }
  };
  return (
    <HeaderComponent darkmode={darkMode}>
      <div className="buttons">
        <Button darkmode={darkMode} onClick={() => topFunctionHandler()}>
          <div className={active ? "active wrapper" : "wrapper"}>
            <AiOutlineLineChart className="button-icon" />
            Top
          </div>
        </Button>
        <Button darkmode={darkMode} onClick={() => newFunctionHandler()}>
          <div className={active ? "wrapper" : "active wrapper"}>
            <MdNewReleases className="button-icon" />
            New
          </div>
        </Button>
      </div>

      <div className="view">
        {!classicView && !compactView && (
          <ViewOption
            darkMode={darkMode}
            height="8px"
            mobileHeight="9px"
            onClick={() => setShowOptions(!showOptions)}
          >
            <div className="lines">
              <div
                className={
                  !classicView && !compactView ? "line active" : "line"
                }
              ></div>
              <div
                className={
                  !classicView && !compactView ? "line active" : "line"
                }
              ></div>
            </div>
            <RiArrowDownSFill />
          </ViewOption>
        )}
        {classicView && !compactView && (
          <ViewOption
            darkMode={darkMode}
            height="5px"
            mobileHeight="6px"
            onClick={() => setShowOptions(!showOptions)}
          >
            <div className="lines">
              <div
                className={classicView && !compactView ? "line active" : "line"}
              ></div>
              <div
                className={classicView && !compactView ? "line active" : "line"}
              ></div>
              <div
                className={classicView && !compactView ? "line active" : "line"}
              ></div>
            </div>
            <RiArrowDownSFill />
          </ViewOption>
        )}
        {classicView && compactView && (
          <ViewOption
            darkMode={darkMode}
            height="3px"
            mobileHeight="3px"
            onClick={() => setShowOptions(!showOptions)}
          >
            <div className="lines">
              <div
                className={classicView && compactView ? "line active" : "line"}
              ></div>
              <div
                className={classicView && compactView ? "line active" : "line"}
              ></div>
              <div
                className={classicView && compactView ? "line active" : "line"}
              ></div>
              <div
                className={classicView && compactView ? "line active" : "line"}
              ></div>
            </div>
            <RiArrowDownSFill />
          </ViewOption>
        )}

        {showOptions && (
          <div className="options">
            <ViewOption
              darkMode={darkMode}
              height="8px"
              mobileHeight="9px"
              onClick={() => {
                setShowOptions(false);
                setClassicView(false);
              }}
            >
              <div className="lines">
                <div
                  className={
                    !classicView && !compactView ? "line active" : "line"
                  }
                ></div>
                <div
                  className={
                    !classicView && !compactView ? "line active" : "line"
                  }
                ></div>
              </div>
              <span>Card</span>
            </ViewOption>
            <ViewOption
              darkMode={darkMode}
              height="5px"
              mobileHeight="6px"
              onClick={() => {
                setShowOptions(false);
                setClassicView(true);
              }}
            >
              <div className="lines">
                <div
                  className={
                    classicView && !compactView ? "line active" : "line"
                  }
                ></div>
                <div
                  className={
                    classicView && !compactView ? "line active" : "line"
                  }
                ></div>
                <div
                  className={
                    classicView && !compactView ? "line active" : "line"
                  }
                ></div>
              </div>
              <span>Classic</span>
            </ViewOption>
            <ViewOption
              darkMode={darkMode}
              height="3px"
              mobileHeight="3px"
              onClick={() => {
                setShowOptions(false);
                setCompactView(true);
              }}
            >
              <div className="lines">
                <div
                  className={
                    classicView && compactView ? "line active" : "line"
                  }
                ></div>
                <div
                  className={
                    classicView && compactView ? "line active" : "line"
                  }
                ></div>
                <div
                  className={
                    classicView && compactView ? "line active" : "line"
                  }
                ></div>
                <div
                  className={
                    classicView && compactView ? "line active" : "line"
                  }
                ></div>
              </div>
              <span>Compact</span>
            </ViewOption>
          </div>
        )}
      </div>
    </HeaderComponent>
  );
};

export default Header;
