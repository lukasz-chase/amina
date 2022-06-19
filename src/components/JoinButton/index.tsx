import React, { useState, useEffect } from "react";
//styles
import { Button } from "./ButtonStyles";
//store
import viewState from "../../state/viewState";
import userState from "../../state/userState";
import subaminsState from "../../state/subaminsState";
//notistack
import { useSnackbar } from "notistack";

type joinProps = {
  id: String;
};

const JoinButton: React.FC<joinProps> = ({ id }) => {
  //state
  const { loggedUser, isLogged } = userState((state) => state);
  const { joinSubamin } = subaminsState((state) => state);
  const [isJoined, setIsJoined] = useState<boolean>(
    isLogged && loggedUser?.followedSubaminas.find((a) => a === id)
      ? true
      : false
  );
  const darkmodeState = viewState<boolean>((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const classicView: boolean = viewState((state) => state.classicView);
  const compactView: boolean = viewState((state) => state.compactView);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  //useEffect
  useEffect(() => {
    if (isLogged) {
      if (loggedUser.followedSubaminas.find((a) => a === id)) {
        setIsJoined(true);
      } else {
        setIsJoined(false);
      }
    }
  }, [isLogged, loggedUser.followedSubaminas, setIsJoined, id]);
  //handlers
  const snackbarHandler = (snackbarMessage: string, snackVariant: any) => {
    enqueueSnackbar(snackbarMessage, { variant: snackVariant });
    closeSnackbar(0);
  };
  const joinHandler = () => {
    setIsJoined(true);
    joinSubamin(loggedUser._id, id);
    snackbarHandler("Subamin joined successfully", "success");
  };
  const leaveHandler = () => {
    setIsJoined(false);
    joinSubamin(loggedUser._id, id);
    snackbarHandler("Subamin left successfully", "success");
  };

  return (
    <Button
      $darkmode={darkMode}
      $classicview={classicView}
      $compactview={compactView}
      $islogged={isLogged}
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
