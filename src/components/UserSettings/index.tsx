import React, { useState, useEffect } from "react";
//styling
import { SettingsWrapper } from "./UserSettingsStyles";
//interfaces
import { User } from "../../interfaces";
//data
import {
  userInfoInputs,
  userEmailInputs,
  userPasswordInputs,
} from "../../descriptions/inputs";
//components
import Input from "../Input";
import Button from "../Button";
//store
import userState from "../../state/userState";
//notistack
import { useSnackbar } from "notistack";

interface SettingsProperties {
  darkmode: boolean;
  loggedUser: User;
  isLogged: boolean;
}
export type userData = {
  avatar: any;
  birthday: string;
  email: string;
  passwordCheck: string;
  oldPassword: string;
  newPassword: string;
  checkNewPassword: string;
};

const UserSettings: React.FC<SettingsProperties> = ({
  darkmode,
  isLogged,
  loggedUser,
}) => {
  //state
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [userData, setUserData] = useState<userData>({
    avatar: "",
    birthday: "",
    email: "",
    passwordCheck: "",
    oldPassword: "",
    newPassword: "",
    checkNewPassword: "",
  });
  const { updateInfo, updateEmail, updatePassword } = userState(
    (state) => state
  );
  //useEffects
  useEffect(() => {
    if (isLogged) {
      setUserData({
        ...userData,
        avatar: loggedUser.avatar!,
        birthday: loggedUser.birthday!,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUser]);
  //handlers
  const snackbarHandler = (snackbarMessage: any, snackVariant: any) => {
    enqueueSnackbar(snackbarMessage, { variant: snackVariant });
    closeSnackbar(500);
  };
  const clearData = () =>
    setUserData({
      avatar: "",
      birthday: "",
      email: "",
      passwordCheck: "",
      oldPassword: "",
      newPassword: "",
      checkNewPassword: "",
    });
  const simpleInfoHandler = () => {
    const formData = new FormData();
    formData.append("birthday", userData.birthday);
    formData.append("avatar", userData.avatar);
    updateInfo(loggedUser._id, formData, snackbarHandler);
    clearData();
  };
  const passwordHandler = () => {
    if (userData.newPassword === userData.checkNewPassword) {
      updatePassword(
        loggedUser._id,
        userData.oldPassword,
        userData.newPassword,
        snackbarHandler
      );
      clearData();
    } else {
      snackbarHandler("passwords dont match", "error");
    }
  };
  const emailHandler = () => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        userData.email
      )
    ) {
      updateEmail(
        loggedUser._id,
        userData.email,
        userData.passwordCheck,
        snackbarHandler
      );
      clearData();
    } else {
      snackbarHandler("Incorrect email", "error");
    }
  };
  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setUserData({ ...userData, [target.name]: target.value });
  };
  const imagesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target && target.files) {
      setUserData({
        ...userData,
        avatar: target.files[0],
      });
    }
  };

  return (
    <SettingsWrapper darkmode={darkmode}>
      {userInfoInputs.map((input) => (
        <>
          <span>{input.label}</span>
          <Input
            name={input.name}
            value={userData[input.name as keyof typeof userData]}
            inputType={input.inputType}
            type={input.type}
            imageName={userData?.avatar?.name}
            handleChange={(e) => handleForm(e)}
            required={input.required}
            imagesHandler={(e) => imagesHandler(e)}
          />
        </>
      ))}
      <Button
        type="submit"
        label="Submit"
        onClick={() => simpleInfoHandler()}
      />
      <div className="line"></div>
      {userEmailInputs.map((input) => (
        <>
          <span>{input.label}</span>
          <Input
            name={input.name}
            value={userData[input.name as keyof typeof userData]}
            type={input.type}
            placeholder={input.placeholder}
            handleChange={(e) => handleForm(e)}
            required={input.required}
            imagesHandler={(e) => imagesHandler(e)}
          />
        </>
      ))}
      <Button type="submit" label="Submit" onClick={() => emailHandler()} />
      <div className="line"></div>
      {userPasswordInputs.map((input) => (
        <>
          <span>{input.label}</span>
          <Input
            name={input.name}
            value={userData[input.name as keyof typeof userData]}
            type={input.type}
            placeholder={input.placeholder}
            handleChange={(e) => handleForm(e)}
            required={input.required}
            imagesHandler={(e) => imagesHandler(e)}
          />
        </>
      ))}
      <Button type="submit" label="Submit" onClick={() => passwordHandler()} />
    </SettingsWrapper>
  );
};

export default UserSettings;
