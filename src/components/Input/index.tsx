import React, { useState } from "react";
//material ui
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
//icons
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

type InputProps = {
  name: string;
  value: string;
  type?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  inputType?: string;
  imagesHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multipleFiles?: boolean;
  maxLength?: number;
  rows?: number;
  placeholder?: string;
  imageName?: any;
  image?: any;
};

const Input2 = ({
  name,
  value,
  type,
  handleChange,
  required,
  inputType,
  imagesHandler,
  multipleFiles,
  maxLength,
  rows,
  placeholder,
  imageName,
  image,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      {inputType === "textField" ? (
        <TextField
          className="textField"
          multiline
          rows={rows}
          name={name}
          value={value}
          onChange={handleChange}
        />
      ) : inputType === "image" ? (
        <label className="custom-file-upload">
          <input
            onChange={imagesHandler}
            type="file"
            accept="image/*"
            name={name}
            multiple={multipleFiles}
          />
          {image && !image.name && (
            <img src={image} alt={name} className="inputImg" />
          )}
          {imageName || image?.name ? imageName || image?.name : "Pick a file"}
        </label>
      ) : (
        <Input
          className="input"
          required={required}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          type={showPassword ? "text" : type}
          inputProps={{ maxLength }}
          endAdornment={
            <>
              {type === "password" && (
                <InputAdornment position="start">
                  {showPassword ? (
                    <MdVisibility
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <MdVisibilityOff
                      className="search-icon"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </InputAdornment>
              )}
              {maxLength && (
                <InputAdornment position="end" className="text">
                  {value.length}/{maxLength}
                </InputAdornment>
              )}
            </>
          }
        />
      )}
    </>
  );
};

export default Input2;
