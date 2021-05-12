import React, { useEffect } from "react";
//styles
import { SearchPageComponent, Wrapper } from "./SearchPageStyles";
//router
import { useLocation, Link } from "react-router-dom";
import { Location } from "history";
//store
import searchState from "../../state/searchState";
import viewState from "../../state/viewState";
import userState from "../../state/userState";
//components
import Post from "../../components/Post";
import Header from "../../components/Header";
import BackToTopButton from "../../components/BackToTopButton";
//interface
import { User, PostProperties, Subamin } from "../../interfaces";
//scroll bottom
import { BottomScrollListener } from "react-bottom-scroll-listener";
import Community from "../../components/Community";

const SearchPage: React.FC = () => {
  //state
  const location = useLocation<Location>();
  const question = location.pathname.split("/")[3];
  const path = location.pathname.split("/")[2];
  const subamins = searchState<Subamin[]>((state) => state.subaminasSearch);
  const posts = searchState<PostProperties[]>((state) => state.postSearch);
  const fetchTopPosts = searchState((state) => state.fetchTopPostsSearch);
  const fetchNewPosts = searchState((state) => state.fetchNewPostsSearch);
  const limit = searchState((state) => state.limit);
  const changeLimit = searchState((state) => state.changeLimit);
  const loggedUser = userState<User>((state) => state.loggedUser);
  const isLogged = userState<boolean>((state) => state.isLogged);
  const darkmodeState = viewState<boolean>((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const fetchUser = userState((state) => state.fetchLoggedUser);
  const fetchTopSubamins = searchState(
    (state) => state.fetchTopSubaminasSearch
  );
  const fetchNewSubamins = searchState(
    (state) => state.fetchNewSubaminasSearch
  );
  //useEffects
  useEffect(() => {
    fetchTopPosts(limit, question);
    fetchTopSubamins(limit, question);
  }, [fetchTopPosts, fetchTopSubamins, question, limit]);

  useEffect(() => {
    fetchUser(Number(localStorage.getItem("userId")));
  }, [fetchUser]);
  //handlers
  const handleLimit = () => {
    changeLimit(20);
  };
  return (
    <SearchPageComponent darkmode={darkMode}>
      <BottomScrollListener onBottom={handleLimit} offset={500} />
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
            <BackToTopButton />
            <Header
              topFunction={fetchTopSubamins}
              newFunction={fetchNewSubamins}
              question={question}
              limit={limit}
            />
            {subamins.map((subamin) => (
              <Community subamin={subamin} key={subamin.id} search />
            ))}
          </div>
        ) : (
          <div className="posts">
            <BackToTopButton />
            <Header
              topFunction={fetchTopPosts}
              newFunction={fetchNewPosts}
              question={question}
              limit={limit}
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
