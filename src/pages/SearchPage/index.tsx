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
  const fetchTopPosts = searchState((state) => state.fetchTopPostsSearch);
  const fetchNewPosts = searchState((state) => state.fetchNewPostsSearch);
  const fetchTopSubamins = searchState(
    (state) => state.fetchTopSubaminasSearch
  );
  const fetchNewSubamins = searchState(
    (state) => state.fetchNewSubaminasSearch
  );
  useEffect(() => {
    fetchTopPosts(question);
    fetchTopSubamins(question);
  }, [fetchTopPosts, fetchTopSubamins, question]);
  console.log(posts);
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
            <Header
              topFunction={fetchTopSubamins}
              newFunction={fetchNewSubamins}
              question={question}
            />
            {subamins.map((subamin) => (
              <div className="community" key={subamin.id}>
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
