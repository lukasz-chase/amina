import React, { useEffect } from "react";
//styles
import { SearchPageComponent, Wrapper } from "./SearchPageStyles";
//router
import { useLocation, Link } from "react-router-dom";
//store
import searchState from "../../state/searchState";
import viewState from "../../state/viewState";
import userState from "../../state/userState";
//components
import Post from "../../components/Post";
import JoinButton from "../../components/JoinButton";
import Header from "../../components/Header";

const SearchPage = () => {
  //state
  const location = useLocation();
  const question = location.pathname.split("/")[3];
  const path = location.pathname.split("/")[2];
  const subamins = searchState((state) => state.subaminasSearch);
  const posts = searchState((state) => state.postSearch);
  const fetchTopPosts = searchState((state) => state.fetchTopPostsSearch);
  const fetchNewPosts = searchState((state) => state.fetchNewPostsSearch);
  const loggedUser = userState((state) => state.loggedUser);
  const isLogged = userState((state) => state.isLogged);
  const darkmodeState = viewState((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const fetchUser = userState((state) => state.fetchUser);
  const fetchTopSubamins = searchState(
    (state) => state.fetchTopSubaminasSearch
  );
  const fetchNewSubamins = searchState(
    (state) => state.fetchNewSubaminasSearch
  );
  //useEffects
  useEffect(() => {
    fetchTopPosts(question);
    fetchTopSubamins(question);
  }, [fetchTopPosts, fetchTopSubamins, question]);

  useEffect(() => {
    fetchUser(Number(localStorage.getItem("userId")));
  }, [fetchUser]);

  return (
    <SearchPageComponent darkmode={darkMode}>
      <div className="header">
        <div className="text">
          <h1>{question}</h1>
          <p>Search results</p>
        </div>
        <div className="links">
          <Link
            to={`/search/subaminas/${question}`}
            className={path === "subaminas" ? "link active" : "link"}
            onClick={() => window.scrollTo(0, 0)}
          >
            subaminas
          </Link>
          <Link
            to={`/search/posts/${question}`}
            className={path === "posts" ? "link active" : "link"}
            onClick={() => window.scrollTo(0, 0)}
          >
            Posts
          </Link>
        </div>
      </div>
      <Wrapper darkmode={darkMode}>
        {path === "subaminas" ? (
          <div className="subamins">
            <Header
              topFunction={fetchTopSubamins}
              newFunction={fetchNewSubamins}
              question={question}
            />
            {subamins.map((subamin) => (
              <Link
                className="community"
                key={subamin.id}
                to={`/s/${subamin.id}`}
              >
                <div className="left">
                  <img src={subamin.logo} alt={subamin.name} />
                  <div className="name-members">
                    <span className="name"> {subamin.name}</span>
                    <span> {subamin.members}</span>
                  </div>
                </div>
                <span className="info">{subamin.desc}</span>
                <JoinButton />
              </Link>
            ))}
          </div>
        ) : (
          <div className="posts">
            <Header
              topFunction={fetchTopPosts}
              newFunction={fetchNewPosts}
              question={question}
            />
            {posts.map((post) => (
              <Post post={post} key={post.id} />
            ))}
          </div>
        )}
      </Wrapper>
    </SearchPageComponent>
  );
};

export default SearchPage;
