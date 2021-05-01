import React, { useEffect } from "react";
//styles
import { HomeComponent, Posts, Info } from "./HomeStyles";
//store
import viewState from "../../state/viewState";
import postState from "../../state/postState";
import subaminsState from "../../state/subaminsState";
import userState from "../../state/userState";
//components
import Header from "../../components/Header";
import Post from "../../components/Post";
//router
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  //state
  const loggedUser = userState((state) => state.loggedUser);
  const isLogged = userState((state) => state.isLogged);
  const darkmodeState = viewState((state) => state.darkMode);
  const darkmode: boolean = isLogged ? loggedUser.darkMode : darkmodeState;
  const fetchSubamins = subaminsState((state) => state.fetchSubamins);
  const fetchTopPosts = postState((state) => state.fetchTopPosts);
  const fetchNewPosts = postState((state) => state.fetchNewPosts);
  const posts = postState((state) => state.posts);
  const classicview: boolean = viewState((state) => state.classicView);
  const subamins = subaminsState((state) => state.subamins);
  const usersFeed = subaminsState((state) => state.usersFeed);
  const fetchNewSubaminByIds = subaminsState(
    (state) => state.fetchNewSubaminByIds
  );
  const fetchUser = userState((state) => state.fetchUser);
  //useEffect
  useEffect(() => {
    fetchUser(Number(localStorage.getItem("userId")));
    fetchSubamins();
    fetchTopPosts();
  }, [fetchSubamins, fetchTopPosts, fetchUser]);
  useEffect(() => {
    if (isLogged) {
      fetchNewSubaminByIds(loggedUser.followedSubaminas);
    }
  }, [loggedUser.followedSubaminas, fetchNewSubaminByIds, isLogged]);
  return (
    <HomeComponent darkmode={darkmode} classicview={classicview}>
      <Posts darkmode={darkmode} classicview={classicview}>
        <div className="post-wrapper">
          {isLogged && usersFeed ? (
            <>
              <Header feed />
              {usersFeed.map((post) => (
                <Post post={post} key={post.id} />
              ))}
            </>
          ) : (
            <>
              <Header topFunction={fetchTopPosts} newFunction={fetchNewPosts} />
              {posts.map((post) => (
                <Post post={post} key={post.id} />
              ))}
            </>
          )}
        </div>
      </Posts>
      <Info darkmode={darkmode} classicview={classicview}>
        <div className="trending">
          <h2>Most popular subaminas</h2>
          {subamins
            .sort((a, b) => a.members - b.members)
            .slice(0, 5)
            .map((subamin, index) => (
              <Link className="subamina" key={index} to={`/s/${subamin.id}`}>
                <span>{index + 1}</span>
                <img src={subamin.logo} alt={subamin.name} className="logo" />
                <span>{subamin.name}</span>
              </Link>
            ))}
        </div>
      </Info>
    </HomeComponent>
  );
};

export default Home;
