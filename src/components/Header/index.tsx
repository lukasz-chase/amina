import React, { useState } from "react";
//styling
import { HeaderComponent, Button, ViewOption } from "./HeaderStyles";
//store
import viewState from "../../state/viewState";
import userState from "../../state/userState";
import postState from "../../state/postState";
import authState from "../../state/authState";
//icons
import { AiOutlineLineChart } from "react-icons/ai";
import { MdNewReleases } from "react-icons/md";
import { RiArrowDownSFill } from "react-icons/ri";
//interfaces
import { User } from "../../interfaces";

type HeaderProps = {
  postsFunction?: (limit: number, order: string, id?: any) => void;
  question?: string;
  id?: String;
  subamin?: boolean;
  feed?: boolean;
  limit: number;
  subaminFunction?: (limit: number, order: string, question?: any) => void;
};

const Header: React.FC<HeaderProps> = ({
  postsFunction,
  subaminFunction,
  question,
  id,
  subamin,
  feed,
  limit,
}) => {
  //state
  const {
    setClassicView,
    setCompactView,
    compactView,
    classicView,
    darkMode: darkMNodeState,
  } = viewState((state) => state);
  const loggedUser = userState<User>((state) => state.loggedUser);
  const isLogged = authState<boolean>((state) => state.isLogged);
  const { getUserFeed } = postState((state) => state);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkMNodeState;
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(true);
  //handlers
  const topFunctionHandler = () => {
    setActive(true);
    if (subamin) {
      subaminFunction!(limit, "members", id || question);
    } else if (feed) {
      getUserFeed(loggedUser._id, limit, "upvotes");
    } else {
      postsFunction!(limit, "upvotes", id || question);
    }
  };

  const newFunctionHandler = () => {
    setActive(false);
    if (subamin) {
      subaminFunction!(limit, "createdAt", id || question);
    } else if (feed) {
      getUserFeed(loggedUser._id, limit, "createdAt");
    } else {
      postsFunction!(limit, "createdAt", id || question);
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
