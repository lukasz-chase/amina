import React, { useState } from "react";
//styling
import { LoginComponent } from "./LoginStyles";
//material ui
import InputLabel from "@material-ui/core/InputLabel";
//state
import viewState from "../../state/viewState";
import authState from "../../state/authState";
//location
import { useLocation, Link, useHistory } from "react-router-dom";
import { Location } from "history";
//components
import Button from "../../components/Button";
import Input from "../../components/Input";
//data
import { loginInputs, registerInputs } from "../../descriptions/inputs";
//notistack
import { useSnackbar } from "notistack";

export type formData = {
  username: string;
  password: string;
  email: string;
};

const LoginPage: React.FC = () => {
  //state
  const [form, setForm] = useState<formData>({
    username: "",
    password: "",
    email: "",
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const darkMode = viewState<boolean>((state) => state.darkMode);
  const location = useLocation<Location>();
  const fromUpvote = location.pathname.split("/")[2];
  const history = useHistory<Location>();
  const page = location.pathname.split("/")[1];
  const {
    signIn,
    signUp,
    signInError,
    signUpError,
    setSignInError,
    setSignUpError,
  } = authState((state) => state);
  //handlers
  const clearForm = () => {
    setForm({
      email: "",
      password: "",
      username: "",
    });
  };
  const snackbarHandler = (snackbarMessage: any, snackVariant: any) => {
    enqueueSnackbar(snackbarMessage, { variant: snackVariant });
    closeSnackbar(500);
  };
  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setForm({ ...form, [target.name]: target.value });
  };
  const loginHandler = () => {
    if (form.username !== "" && form.password !== "") {
      signIn(form, history, fromUpvote);
      snackbarHandler("signed in", "success");
    } else {
      setSignInError("Inputs can't be empty");
    }
  };

  const registerHandler = () => {
    if (form.email !== "" && form.password !== "" && form.username !== "") {
      // eslint-disable-next-line no-useless-escape
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) {
        // eslint-disable-next-line no-useless-escape
        if (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{6,}$/.test(form.password)) {
          signUp(form, history);
          clearForm();
          snackbarHandler("account created successfully", "success");
        } else {
          setSignUpError(
            "password has to contain at least 6 characters with 1 digit and 1 lower case"
          );
        }
      } else {
        setSignUpError("invalid email");
      }
    } else {
      setSignUpError("inputs can't be empty");
    }
  };

  return (
    <LoginComponent darkmode={darkMode}>
      <h1>{page === "login" ? "Login" : "Sign up"}</h1>
      <h2>
        By continuing, you agree to our User Agreement and Privacy Policy.
      </h2>
      {page === "login" ? (
        <div className="form">
          {loginInputs.map((input) => (
            <>
              <InputLabel htmlFor="filled-adornment-password" className="label">
                {input.label}
              </InputLabel>
              <Input
                name={input.name}
                value={form[input.name as keyof typeof form]}
                type={input.type}
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleForm(e)
                }
                required={input.required}
              />
            </>
          ))}
          <Button type="submit" label="Log In" onClick={() => loginHandler()} />
          <span className="error">{signInError}</span>
          <span className="sing-up">
            New to Amina?{" "}
            <Link to="/register" className="link" onClick={() => clearForm()}>
              sign up
            </Link>
          </span>
        </div>
      ) : (
        <div className="form">
          {registerInputs.map((input) => (
            <>
              <InputLabel htmlFor="filled-adornment-password" className="label">
                {input.label}
              </InputLabel>
              <Input
                name={input.name}
                value={form[input.name as keyof typeof form]}
                type={input.type}
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleForm(e)
                }
                required={input.required}
              />
            </>
          ))}
          <span className="error">{signUpError}</span>
          <Button
            type="submit"
            label="Register"
            onClick={() => registerHandler()}
          />
          <span className="sing-up">
            Already a aminator?{" "}
            <Link to="/login" className="link" onClick={() => clearForm()}>
              log in
            </Link>
          </span>
        </div>
      )}
    </LoginComponent>
  );
};

export default LoginPage;
