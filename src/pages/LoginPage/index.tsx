import React, { useState } from "react";
//styling
import { LoginComponent } from "./LoginStyles";
//material ui
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
//icons
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
//state
import viewState from "../../state/viewState";
//location
import { useLocation, Link } from "react-router-dom";
import { Location } from "history";
const LoginPage: React.FC = () => {
  //login State
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPassVisibility] = useState(false);
  //register state
  const [registerLogin, setRegisterLogin] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPassVisibility, setRegPassVisibility] = useState(false);
  //state
  const darkMode = viewState((state) => state.darkMode);
  const location = useLocation<Location>();
  const page = location.pathname.split("/")[1];
  return (
    <LoginComponent darkmode={darkMode}>
      <h1>{page === "login" ? "Login" : "Sign up"}</h1>
      <h2>
        By continuing, you agree to our User Agreement and Privacy Policy.
      </h2>
      {page === "login" ? (
        <form className="form">
          <InputLabel htmlFor="filled-adornment-password" className="label">
            Login
          </InputLabel>
          <FilledInput
            className="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <InputLabel htmlFor="filled-adornment-password" className="label">
            Password
          </InputLabel>
          <FilledInput
            className="password"
            type={passwordVisibility ? "text" : "password"}
            value={password}
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
          <button type="submit" className="submit-button">
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
            Login
          </InputLabel>
          <FilledInput
            className="login"
            value={registerLogin}
            onChange={(e) => setRegisterLogin(e.target.value)}
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
