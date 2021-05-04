import React, { useState } from "react";
//styling
import { CreatePostComponent } from "./CreatePostStyles";
//store
import viewState from "../../state/viewState";
import userState from "../../state/userState";
//icons
import { MdArrowDropDown } from "react-icons/md";
//material ui
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
//axios
import axios from "axios";
import YourSubamins from "../../components/YourSubamins";

const CreatePost = () => {
  //state
  const loggedUser = userState((state) => state.loggedUser);
  const isLogged = userState((state) => state.isLogged);
  const darkmodeState = viewState((state) => state.darkMode);
  const darkmode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [open, setOpen] = useState(false);
  //handlers
  const addPost = () => {
    console.log("kupa");
  };
  return (
    <CreatePostComponent darkmode={darkmode}>
      <div className="left">
        <h1>Create a Post</h1>
        <div className="choose-community" onClick={() => setOpen(!open)}>
          Choose a community
          <MdArrowDropDown className="arrow-icon" />
          <YourSubamins open={open} setOpen={setOpen} />
        </div>
        <form className="form">
          <Input
            className="post-title"
            placeholder="Title"
            value={postTitle}
            multiline
            onChange={(e) =>
              postTitle.length <= 299 ? setPostTitle(e.target.value) : ""
            }
            disableUnderline
            endAdornment={
              <InputAdornment position="end" className="text">
                {postTitle.length}/300
              </InputAdornment>
            }
          />
          <TextField
            className="text-field"
            multiline
            placeholder="Text (optional)"
            rows={6}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <button type="submit" className="submit" onClick={() => addPost()}>
            Post
          </button>
        </form>
      </div>
    </CreatePostComponent>
  );
};

export default CreatePost;
