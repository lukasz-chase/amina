import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
//notistack
import { SnackbarProvider, SnackbarKey } from "notistack";
//icon
import { AiFillCloseCircle } from "react-icons/ai";

const notistackRef = React.createRef<SnackbarProvider>();

const onClickDismiss = (key: SnackbarKey) => () => {
  notistackRef.current!.closeSnackbar(key);
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider
        ref={notistackRef}
        maxSnack={1}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        action={(key) => <AiFillCloseCircle onClick={onClickDismiss(key)} />}
      >
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
