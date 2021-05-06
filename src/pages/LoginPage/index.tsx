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
//encrypting password
import sha512 from "crypto-js/sha512";
import Base64 from "crypto-js/enc-base64";

const LoginPage: React.FC = () => {
  //login State
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisibility, setPassVisibility] = useState<boolean>(false);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState<string>("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>("");
  const [falseUsername, setFalseUsername] = useState<boolean>(false);
  const [falsePassword, setFalsePassword] = useState<boolean>(false);
  //register state
  const [registerUsername, setRegisterUsername] = useState<string>("");
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [registerPassVisibility, setRegPassVisibility] = useState<boolean>(
    false
  );
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);
  const [registerError, setRegisterError] = useState<boolean>(false);
  const [registerErrorMsg, setRegisterErrorMsg] = useState<string>("");
  //state
  const darkMode = viewState<boolean>((state) => state.darkMode);
  const location = useLocation<Location>();
  const page = location.pathname.split("/")[1];
  const history = useHistory<Location>();
  const fetchUser = userState((state) => state.fetchUser);

  //handlers
  const loginHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios.get(loginUrl(username)).then((res) => {
      if (res.data[0]) {
        if (res.data[0].password === sha512(password).toString(Base64)) {
          history.push("/");
          localStorage.setItem("userId", res.data[0].id);
          fetchUser(res.data[0].id);
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

  const registerHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .get(`http://localhost:3000/users?email=${registerEmail}`)
      .then((res) => {
        if (res.data[0]) {
          setRegisterSuccess(false);
          setRegisterError(true);
          setRegisterErrorMsg("Theres already an account with that email");
        } else {
          axios
            .get(`http://localhost:3000/users?username=${registerUsername}`)
            .then((res) => {
              if (res.data[0]) {
                setRegisterSuccess(false);
                setRegisterError(true);
                setRegisterErrorMsg(
                  "Theres already an account with that username"
                );
              } else {
                if (
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                    registerEmail
                  )
                ) {
                  if (registerPassword.length >= 6) {
                    if (registerUsername !== "") {
                      axios
                        .post(`http://localhost:3000/users`, {
                          username: registerUsername,
                          email: registerEmail,
                          password: sha512(registerPassword).toString(Base64),
                          followedSubaminas: [],
                          darkMode: false,
                        })
                        .then(() => {
                          setRegisterError(false);
                          setRegisterSuccess(true);
                          setRegisterPassword("");
                          setRegisterEmail("");
                          setRegisterUsername("");
                        });
                    } else {
                      setRegisterSuccess(false);
                      setRegisterError(true);
                      setRegisterErrorMsg("Inputs cant be empty");
                    }
                  } else {
                    setRegisterSuccess(false);
                    setRegisterError(true);
                    setRegisterErrorMsg(
                      "Password has to be at least 6 letters long"
                    );
                  }
                } else {
                  setRegisterSuccess(false);
                  setRegisterError(true);
                  setRegisterErrorMsg("incorrect email");
                }
              }
            });
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
          <span className="error">{registerError ? registerErrorMsg : ""}</span>
          <span className="success">
            {registerSuccess ? "Registration was successfull" : ""}
          </span>
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
          <button
            type="submit"
            className="submit-button"
            onClick={(e) => registerHandler(e)}
          >
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
