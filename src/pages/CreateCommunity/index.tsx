import React, { useState, useEffect } from "react";
//styling
import { CreateCommunityComponent } from "./CreateCommunityStyles";
//store
import viewState from "../../state/viewState";
import userState from "../../state/userState";
import subaminsState from "../../state/subaminsState";
//material ui
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
//axios
import axios from "axios";
//interfaces
import { User } from "../../interfaces";
//location
import { useHistory } from "react-router-dom";
import { Location } from "history";

const CreateCommunity: React.FC = () => {
  //state
  const loggedUser = userState<User>((state) => state.loggedUser);
  const isLogged = userState<boolean>((state) => state.isLogged);
  const darkmodeState = viewState<boolean>((state) => state.darkMode);
  const darkmode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [backgImg, setBackgImg] = useState<string>("");
  const [logo, setLogo] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const fetchUser = userState((state) => state.fetchLoggedUser);
  const allSubamins = subaminsState((s) => s.allSubamins);
  const fetchAllSubamins = subaminsState((s) => s.fetchAllSubamins);
  const history = useHistory<Location>();
  //useEffect
  useEffect(() => {
    fetchUser(Number(localStorage.getItem("userId")));
  }, [fetchUser]);
  useEffect(() => {
    fetchAllSubamins();
  }, [fetchAllSubamins]);
  //handlers
  const addCommunity = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    const hour = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    if (name && desc && logo) {
      axios.get(`http://localhost:3000/subamins?name=${name}`).then((res) => {
        if (res.data[0]) {
          setMessage("theres already a community with that name");
        } else {
          axios
            .post(`http://localhost:3000/subamins`, {
              name: name,
              members: 0,
              desc: desc,
              logo: logo,
              background: backgImg,
              birthday: `${mm}/${dd}/${yyyy}, ${hour}:${minutes}:${seconds}`,
              authorId: loggedUser.id,
            })
            .then(() => {
              setName("");
              setDesc("");
              setBackgImg("");
              setLogo("");
              setMessage("");
              history.push(`/s/${allSubamins[0].id + 1}`);
            });
        }
      });
    }
  };
  return (
    <>
      {isLogged && (
        <CreateCommunityComponent
          darkmode={darkmode}
          ready={name && desc && logo ? true : false}
        >
          <h1>Create a community</h1>
          <h2>{message}</h2>
          <form className="form">
            <h2>Name*</h2>
            <span>
              Community names including capitalization cannot be changed
            </span>
            <Input
              className="community-name"
              value={name}
              multiline
              onChange={(e) => setName(e.target.value)}
              disableUnderline
              inputProps={{ maxLength: 21 }}
            />

            <h2>Description*</h2>
            <span>
              This is how new members come to understand your community.
            </span>
            <TextField
              className="community-desc"
              multiline
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <h2>Background image url</h2>
            <span>
              This is the banner that will show on yours community page.
            </span>
            <Input
              className="community-backg"
              value={backgImg}
              multiline
              onChange={(e) => setBackgImg(e.target.value)}
              disableUnderline
            />
            <h2>Logo url*</h2>
            <span>
              This is yours community logo that will display everywhere.
            </span>
            <Input
              className="community-logo"
              value={logo}
              multiline
              onChange={(e) => setLogo(e.target.value)}
              disableUnderline
            />
            <button
              className="submit"
              type="submit"
              onClick={(e) => addCommunity(e)}
            >
              Create Community
            </button>
          </form>
        </CreateCommunityComponent>
      )}
    </>
  );
};

export default CreateCommunity;
