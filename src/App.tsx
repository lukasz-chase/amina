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
//store
import viewState from "./state/viewState";
import userState from "./state/userState";
import authState from "./state/authState";

function App() {
  const loggedUser = userState((state) => state.loggedUser);
  const isLogged = authState<boolean>((state) => state.isLogged);
  const darkmodeState = viewState<boolean>((state) => state.darkMode);
  const darkmode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  return (
    <div className="App">
      <GlobalStyles darkmode={darkmode} />
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
      <Route path={["/edit/subamin/:id", "/create/subamin"]} exact>
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
