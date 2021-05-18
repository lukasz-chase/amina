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
import CreatePost from "./pages/CreatePost";
import CreateCommunity from "./pages/CreateCommunity";
import UserDetails from "./pages/UserDetails";

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
      <Route
        path={["/user/:id/settings", "/user/:id/saved", "/user/:id"]}
        exact
      >
        <UserDetails />
      </Route>
      <Route path="/create/post" exact>
        <CreatePost />
      </Route>
      <Route path="/create/subamin" exact>
        <CreateCommunity />
      </Route>
      <Route path={["/login", "/login/upvote", "/register"]} exact>
        <LoginPage />
      </Route>
      <Route path={["/search/posts/:id", "/search/subaminas/:id"]} exact>
        <SearchPage />
      </Route>
    </div>
  );
}

export default App;
