import React from "react";
//styling
import { CreatePostComponent } from "./CreatePostStyles";
//store
import viewState from "../../state/viewState";
import userState from "../../state/userState";
import authState from "../../state/authState";
//interfaces
import { User } from "../../interfaces";
//material ui
import Input from "@mui/material/Input";
//location
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Location } from "history";

const CreatePostHeader = () => {
  //state
  const loggedUser = userState<User>((state) => state.loggedUser);
  const isLogged = authState<boolean>((state) => state.isLogged);
  const darkmodeState = viewState<boolean>((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const history = useHistory<Location>();

  return (
    <CreatePostComponent darkmode={darkMode}>
      <img
        src={
          loggedUser.avatar
            ? loggedUser.avatar
            : "https://assets.faceit-cdn.net/organizer_avatar/7a6cd9b4-aec0-4191-8c00-5ae5144aa58c_1574641946899.jpg"
        }
        alt={loggedUser.username}
        onClick={() => history.push(`/user/${loggedUser._id}`)}
      />
      <Link to="/create/post" className="link">
        <Input
          className="textField"
          placeholder="Create Post"
          disableUnderline
        />
      </Link>
    </CreatePostComponent>
  );
};

export default CreatePostHeader;
