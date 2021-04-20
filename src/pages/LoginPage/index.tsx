import React, { useState } from "react";
//styling
import { LoginComponent } from "./LoginStyles";
//material ui
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
//icons
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
//api
import { loginUrl } from "../../api";
//state
import viewState from "../../state/viewState";
import userState from "../../state/userState";
//location
import { useLocation, Link, useHistory } from "react-router-dom";
import { Location } from "history";
//axios
import axios from "axios";
const LoginPage: React.FC = () => {
  //login State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPassVisibility] = useState(false);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [falseUsername, setFalseUsername] = useState(false);
  const [falsePassword, setFalsePassword] = useState(false);
  //register state
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPassVisibility, setRegPassVisibility] = useState(false);
  //state
  const darkMode = viewState((state) => state.darkMode);
  const location = useLocation<Location>();
  const page = location.pathname.split("/")[1];
  const history = useHistory();
  const fetchUser = userState((state) => state.fetchUser);
  const logIn = userState((state) => state.logIn);
  //handlers

  const loginHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios.get(loginUrl(username)).then((res) => {
      if (res.data[0]) {
        if (res.data[0].password === password) {
          history.push("/");
          localStorage.setItem("userId", res.data[0].id);
          fetchUser(res.data[0].id);
          logIn();
        } else {
          setPasswordErrorMsg("incorrect password");
          setFalsePassword(true);
          setFalseUsername(false);
        }
      } else {
        setFalseUsername(true);
        setFalsePassword(false);
        setUsernameErrorMsg("incorrect username");
      }
    });
  };

  return (
    <LoginComponent darkmode={darkMode}>
      <h1>{page === "login" ? "Login" : "Sign up"}</h1>
      <h2>
        By continuing, you agree to our User Agreement and Privacy Policy.
      </h2>
      {page === "login" ? (
        <form className="form">
          <InputLabel htmlFor="filled-adornment-password" className="label">
            Username
          </InputLabel>
          <FilledInput
            className="login"
            value={username}
            error={falseUsername ? true : false}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span className="false-username">
            {falseUsername ? usernameErrorMsg : ""}
          </span>
          <InputLabel htmlFor="filled-adornment-password" className="label">
            Password
          </InputLabel>
          <FilledInput
            className="password"
            type={passwordVisibility ? "text" : "password"}
            value={password}
            error={falsePassword ? true : false}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="start">
                {passwordVisibility ? (
                  <MdVisibility
                    onClick={() => setPassVisibility(!passwordVisibility)}
                  />
                ) : (
                  <MdVisibilityOff
                    className="search-icon"
                    onClick={() => setPassVisibility(!passwordVisibility)}
                  />
                )}
              </InputAdornment>
            }
          />
          <span className="false-password">
            {falsePassword ? passwordErrorMsg : ""}
          </span>
          <button
            type="submit"
            className="submit-button"
            onClick={(e) => loginHandler(e)}
          >
            Log In
          </button>
          <span className="sing-up">
            New to Amina?{" "}
            <Link to="/register" className="link">
              sign up
            </Link>
          </span>
        </form>
      ) : (
        <form className="form">
          <InputLabel htmlFor="filled-adornment-password" className="label">
            Email
          </InputLabel>
          <FilledInput
            className="login"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
          <InputLabel htmlFor="filled-adornment-password" className="label">
            Username
          </InputLabel>
          <FilledInput
            className="login"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
          />
          <InputLabel htmlFor="filled-adornment-password" className="label">
            Password
          </InputLabel>
          <FilledInput
            className="password"
            type={registerPassVisibility ? "text" : "password"}
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="start">
                {registerPassVisibility ? (
                  <MdVisibility
                    onClick={() =>
                      setRegPassVisibility(!registerPassVisibility)
                    }
                  />
                ) : (
                  <MdVisibilityOff
                    className="search-icon"
                    onClick={() =>
                      setRegPassVisibility(!registerPassVisibility)
                    }
                  />
                )}
              </InputAdornment>
            }
          />
          <button type="submit" className="submit-button">
            Register
          </button>
          <span className="sing-up">
            Already a aminator?{" "}
            <Link to="/login" className="link">
              log in
            </Link>
          </span>
        </form>
      )}
    </LoginComponent>
  );
};

export default LoginPage;
