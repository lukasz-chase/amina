import React from "react";
//components
import GlobalStyles from "./components/GlobalStyles";
import Navbar from "./components/Navbar";
//react router
import { Route } from "react-router-dom";
//pages
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import SearchPage from "./pages/SearchPage";
import SubaminDetails from "./pages/SubaminDetails";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Navbar />
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/post/:id" exact>
        <PostDetails />
      </Route>
      <Route path="/s/:id" exact>
        <SubaminDetails />
      </Route>
      <Route path={["/login", "/register"]} exact>
        <LoginPage />
      </Route>
      <Route path={["/search/posts/:id", "/search/subaminas/:id"]} exact>
        <SearchPage />
      </Route>
    </div>
  );
}

export default App;
