import React, { useState, useEffect } from "react";
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
//interface
import { Subamin, User } from "../../interfaces";

const CreatePost: React.FC = () => {
  //state
  const loggedUser = userState<User>((state) => state.loggedUser);
  const isLogged = userState<boolean>((state) => state.isLogged);
  const darkmodeState = viewState<boolean>((state) => state.darkMode);
  const darkmode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const [postTitle, setPostTitle] = useState<string>("");
  const [postText, setPostText] = useState<string>("");
  const [postImg, setPostImg] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const fetchUser = userState((state) => state.fetchLoggedUser);
  const [subamin, setSubamin] = useState<Subamin>();
  //useEffect
  useEffect(() => {
    fetchUser(Number(localStorage.getItem("userId")));
  }, [fetchUser]);
  //handlers
  const addPost = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    const hour = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    if (subamin && postTitle) {
      axios
        .post(`http://localhost:3000/posts`, {
          subaminId: subamin!.id,
          subaminName: subamin!.name,
          subaminLogo: subamin!.logo,
          date: `${mm}/${dd}/${yyyy}, ${hour}:${minutes}:${seconds}`,
          title: postTitle,
          description: postText ? postText : "",
          author: loggedUser.username,
          authorId: loggedUser.id,
          upvotes: 0,
          upvotedBy: [],
          downvotedBy: [],
          image: postImg ? postImg : "",
          comments: [],
        })
        .then(() => {
          setPostImg("");
          setPostText("");
          setPostTitle("");
        });
    }
  };
  return (
    <CreatePostComponent
      darkmode={darkmode}
      ready={subamin && postTitle ? true : false}
    >
      <div className="left">
        <h1>Create a Post</h1>
        <div className="choose-community">
          <div className="wrapper" onClick={() => setOpen(!open)}>
            {subamin && (
              <span>
                {" "}
                <img src={subamin.logo} alt="" />
                {subamin.name}
              </span>
            )}
            {!subamin && <span>Choose a community</span>}
            <MdArrowDropDown className="arrow-icon" />
          </div>
          <YourSubamins
            open={open}
            setOpen={setOpen}
            width={"20vw"}
            setActiveCommunity={setSubamin}
          />
        </div>
        <form className="form">
          <Input
            className="post-title"
            placeholder="Title"
            value={postTitle}
            multiline
            onChange={(e) => setPostTitle(e.target.value)}
            disableUnderline
            endAdornment={
              <InputAdornment position="end" className="text">
                {postTitle.length}/300
              </InputAdornment>
            }
            inputProps={{ maxLength: 300 }}
          />
          <Input
            className="post-image"
            placeholder="Image src (optional)"
            value={postImg}
            multiline
            onChange={(e) => setPostImg(e.target.value)}
            disableUnderline
          />
          <TextField
            className="text-field"
            multiline
            placeholder="Text (optional)"
            rows={6}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <button type="submit" className="submit" onClick={(e) => addPost(e)}>
            Post
          </button>
        </form>
      </div>
      <div className="right">
        <div className="rules">
          <div className="header">Posting to Amina</div>
          <ul>
            <li>Remember the human</li>
            <li>Behave like you would in real life</li>
            <li>Look for the original source of content</li>
            <li>Search for duplicates before posting</li>
            <li>Read the community's rules</li>
          </ul>
        </div>
        <span>Please be mindful of amina's content policy</span>
        <p> and practice good aminquette.</p>
      </div>
    </CreatePostComponent>
  );
};

export default CreatePost;
