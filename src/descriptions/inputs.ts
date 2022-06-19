export const loginInputs = [
  {
    label: "Username",
    name: "username",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    required: true,
  },
];
export const registerInputs = [
  {
    label: "email",
    name: "email",
    required: true,
  },
  {
    label: "Username",
    name: "username",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    required: true,
  },
];
export const createCommunity = [
  {
    label: "Name",
    subLabel: "Community names including capitalization cannot be changed.",
    name: "name",
    maxLength: 100,
    required: true,
  },
  {
    label: "Description",
    subLabel: "This is how new members come to understand your community.",
    name: "desc",
    rows: 4,
    required: true,
    inputType: "textField",
  },
  {
    label: "Background image url",
    subLabel: "This is the banner that will show on yours community page.",
    name: "backgroundImg",
    required: true,
    inputType: "image",
    multipleFiles: false,
  },
  {
    label: "Logo url",
    subLabel: "This is yours community logo that will display everywhere.",
    name: "logo",
    required: true,
    inputType: "image",
    multipleFiles: false,
  },
];
export const createPostInputs = [
  {
    label: "Title",
    name: "title",
    required: true,
    maxLength: 300,
  },
  {
    label: "Description(optional)",
    name: "desc",
    rows: 6,
    required: false,
    inputType: "textField",
  },
  {
    label: "Images",
    name: "images",
    required: false,
    inputType: "image",
    multipleFiles: true,
  },
];
export const userInfoInputs = [
  {
    label: "Change your avatar",
    name: "avatar",
    required: false,
    inputType: "image",
    multipleFiles: false,
  },
  {
    label: "Change your birthday",
    name: "birthday",
    type: "date",
    required: true,
  },
];
export const userEmailInputs = [
  {
    label: "Change your email",
    placeholder: "new email",
    name: "email",
    required: true,
  },
  {
    name: "passwordCheck",
    placeholder: "password",
    type: "password",
    required: true,
  },
];
export const userPasswordInputs = [
  {
    label: "Change your password",
    placeholder: "your current password",
    name: "oldPassword",
    type: "password",
    required: true,
  },
  {
    name: "newPassword",
    placeholder: "new password",
    type: "password",
    required: true,
  },
  {
    name: "checkNewPassword",
    placeholder: "check new password",
    type: "password",
    required: true,
  },
];
