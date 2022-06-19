import React from "react";
//styling
import { ButtonWrapper } from "./ButtonStyles";
//state
import viewState from "../../state/viewState";
import userState from "../../state/userState";
//interfaces
import { User } from "../../interfaces";

export type ButtonTypes = {
  label: string;
  size?: string;
  Icon?: string;
  disabled?: boolean;
  onClick: () => void;
  type: string;
};

const Button: React.FC<ButtonTypes> = ({
  label,
  size,
  Icon,
  disabled,
  onClick,
  type,
}) => {
  //state
  const loggedUser = userState<User>((state) => state.loggedUser);
  const isLogged = userState<boolean>((state) => state.isLogged);
  const darkmodeState = viewState<boolean>((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  return (
    <ButtonWrapper
      darkmode={darkMode}
      size={size}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {Icon}
      {label}
    </ButtonWrapper>
  );
};

export default Button;
