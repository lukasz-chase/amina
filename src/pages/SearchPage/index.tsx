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
import authState from "../../state/authState";
//components
import Post from "../../components/Post";
import Header from "../../components/Header";
import BackToTopButton from "../../components/BackToTopButton";
//scroll bottom
import { BottomScrollListener } from "react-bottom-scroll-listener";
import Community from "../../components/Community";

const SearchPage: React.FC = () => {
  //state
  const location = useLocation<Location>();
  const question = location.pathname.split("/")[3];
  const path = location.pathname.split("/")[2];
  const {
    subaminasSearch: subamins,
    postSearch: posts,
    fetchPostsSearch: fetchPosts,
    fetchSubaminasSearch: fetchSubamins,
    limit,
    changeLimit,
  } = searchState((state) => state);
  const { loggedUser, fetchLoggedUser: fetchUser } = userState(
    (state) => state
  );
  const { isLogged } = authState((state) => state);
  const darkmodeState = viewState<boolean>((state) => state.darkMode);
  const darkMode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  //useEffects
  useEffect(() => {
    fetchPosts(limit, "createdAt", question);
    fetchSubamins(limit, "createdAt", question);
  }, [fetchPosts, fetchSubamins, question, limit]);

  useEffect(() => {
    if (isLogged) fetchUser();
  }, [fetchUser, isLogged]);
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
              subaminFunction={fetchSubamins}
              subamin
              question={question}
              limit={limit}
            />
            {subamins.map((subamin, i) => (
              <Community subamin={subamin} key={i} search />
            ))}
          </div>
        ) : (
          <div className="posts">
            <BackToTopButton />
            <Header
              postsFunction={fetchPosts}
              question={question}
              limit={limit}
            />
            {posts.map((post, i) => (
              <Post post={post} key={i} />
            ))}
          </div>
        )}
      </Wrapper>
    </SearchPageComponent>
  );
};

export default SearchPage;
