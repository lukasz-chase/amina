import React from "react";
//components
import GlobalStyles from "./components/GlobalStyles";
import Navbar from "./components/Navbar";
//react router
import { Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Navbar />
      <Route path="/">
        <Home />
      </Route>
    </div>
  );
}

export default App;
