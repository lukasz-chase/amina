import React, { useState, useEffect } from "react";
//styles
import { Button } from "./ButtonStyles";
//store
import viewState from "../../state/viewState";
import userState from "../../state/userState";
import axios from "axios";
//interfaces
import { User } from "../../interfaces";

type joinProps = {
  id: number;
};

const JoinButton: React.FC<joinProps> = ({ id }) => {
  //state
  const loggedUser = userState<User>((state) => state.loggedUser);
  const isLoggedState = userState<boolean>((state) => state.isLogged);
  const [isJoined, setIsJoined] = useState<boolean>(
    isLoggedState && loggedUser.followedSubaminas.find((a) => a === id)
      ? true
      : false
  );
  const darkmodeState = viewState<boolean>((state) => state.darkMode);
  const darkMode: boolean = isLoggedState ? loggedUser.darkMode : darkmodeState;
  const classicView: boolean = viewState((state) => state.classicView);
  const compactView: boolean = viewState((state) => state.compactView);
  const fetchUser = userState((state) => state.fetchLoggedUser);
  //useEffect
  useEffect(() => {
    if (isLoggedState) {
      if (loggedUser.followedSubaminas.find((a) => a === id)) {
        setIsJoined(true);
      } else {
        setIsJoined(false);
      }
    }
  }, [isLoggedState, loggedUser.followedSubaminas, setIsJoined, id]);
  //handlers
  const joinHandler = () => {
    axios
      .put(`https://amina-server.herokuapp.com/users/${loggedUser.id}`, {
        username: loggedUser.username,
        email: loggedUser.email,
        password: loggedUser.password,
        followedSubaminas: [...loggedUser.followedSubaminas, id],
        savedPosts: loggedUser.savedPosts,
        logo: loggedUser.logo,
        birthday: loggedUser.birthday,
        id: loggedUser.id,
        darkMode: loggedUser.darkMode,
      })
      .then(() => {
        setIsJoined(true);
        axios
          .get(`https://amina-server.herokuapp.com/subamins/${id}`)
          .then((res) =>
            axios
              .put(`https://amina-server.herokuapp.com/subamins/${id}`, {
                id: res.data.id,
                name: res.data.name,
                desc: res.data.desc,
                members: res.data.members + 1,
                logo: res.data.logo,
                background: res.data.background,
                authorId: res.data.authorId,
                birthday: res.data.birthday,
              })
              .then(() => fetchUser(Number(localStorage.getItem("userId"))))
          );
      });
  };
  const leaveHandler = () => {
    axios
      .put(`https://amina-server.herokuapp.com/users/${loggedUser.id}`, {
        username: loggedUser.username,
        email: loggedUser.email,
        password: loggedUser.password,
        logo: loggedUser.logo,
        birthday: loggedUser.birthday,
        followedSubaminas: loggedUser.followedSubaminas.filter((a) => a !== id),
        savedPosts: loggedUser.savedPosts,
        id: loggedUser.id,
        darkMode: loggedUser.darkMode,
      })
      .then(() => {
        setIsJoined(false);
        axios
          .get(`https://amina-server.herokuapp.com/subamins/${id}`)
          .then((res) =>
            axios
              .put(`https://amina-server.herokuapp.com/subamins/${id}`, {
                id: res.data.id,
                name: res.data.name,
                desc: res.data.desc,
                members: res.data.members - 1,
                logo: res.data.logo,
                background: res.data.background,
                authorId: res.data.authorId,
                birthday: res.data.birthday,
              })
              .then(() => fetchUser(Number(localStorage.getItem("userId"))))
          );
      });
  };
  return (
    <Button
      $darkmode={darkMode}
      $classicview={classicView}
      $compactview={compactView}
      $islogged={isLoggedState}
      $isjoined={isJoined}
      onClick={(e) => {
        e.stopPropagation();
        if (isJoined) {
          leaveHandler();
        } else {
          joinHandler();
        }
      }}
    ></Button>
  );
};

export default JoinButton;
