import React, { useEffect } from "react";
//styles
import { SearchPageComponent, Wrapper } from "./SearchPageStyles";
//router
import { useLocation, Link } from "react-router-dom";
//store
import searchState from "../../state/searchState";
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
  const fetchPosts = searchState((state) => state.fetchPostsSearch);
  const fetchSubamins = searchState((state) => state.fetchSubaminasSearch);
  useEffect(() => {
    fetchPosts(question);
    fetchSubamins(question);
  }, [fetchPosts, fetchSubamins, question]);
  console.log(subamins);
  return (
    <SearchPageComponent>
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
      <Wrapper>
        {path === "subaminas" ? (
          <div className="subamins">
            <Header />
            {subamins.map((subamin) => (
              <div className="community">
                <div className="left">
                  <img src={subamin.logo} alt={subamin.name} />
                  <div className="name-members">
                    <span className="name"> {subamin.name}</span>
                    <span> {subamin.members}</span>
                  </div>
                </div>
                <span className="info">{subamin.desc}</span>
                <JoinButton />
              </div>
            ))}
          </div>
        ) : (
          <div className="posts">
            {posts.map((post) => (
              <Post post={post} />
            ))}
          </div>
        )}
      </Wrapper>
    </SearchPageComponent>
  );
};

export default SearchPage;
